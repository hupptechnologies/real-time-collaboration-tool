'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
	Box,
	Drawer,
	List,
	Toolbar,
	IconButton,
	Tooltip,
	Typography,
	ListItemButton
} from '@mui/material';
import {
	Add,
	ChevronLeft,
	ChevronRight,
	CreateNewFolderOutlined,
	DeleteForeverOutlined,
	EditOutlined,
	FolderCopyOutlined,
	KeyboardArrowDown,
	KeyboardArrowRight,
	MenuBook,
	PostAddOutlined
} from '@mui/icons-material';
import ConfirmModal from '@/components/ConfirmModal';
import FolderListItem from '@/components/home/FolderListItem';
import NewContextMenu from '@/components/home/NewContextMenu';
import { useToaster } from '@/context/ToasterContext';
import { RootState } from '@/redux/store';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { fetchSingleSpaceAction } from '@/redux/space';
import { createFolderAction, deleteFolderAction, updateFolderAction } from '@/redux/folder';
import {
	AddIconButton,
	AddIconContentBox,
	ArrowIconStyle,
	ContentButton,
	ContentIconBox,
	ContentIconInlineBox,
	createBtn,
	DrawerMenuStyle,
	SpaceNameBox
} from '@/styles';
import { IAPIResponse, IContextMenu, IDocument, IFolder, TMenuOption } from '@/types';
import { folderOptionalData, generateDefaultFolderName, restructureFolders } from '@/utils/common';

const SpacePage: React.FC = () => {
	const params = useParams();
	const dispatch = useAppDispatch();
	const { showToaster } = useToaster();
	const { space } = useAppSelector((state: RootState) => state.space);
	const spaceId = params?.spaceId as string;
	const [open, setOpen] = useState<boolean>(true);
	const [openContent, setOpenContent] = useState<boolean>(false);
	const [isHovered, setIsHovered] = useState(false);
	const [folderData, setFolderData] = useState<IFolder[]>([]);
	const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});
	const [editingFolderId, setEditingFolderId] = useState<number | null>(null);
	const [isDeleted, setIsDeleted] = useState<boolean>(false);
	const [deleteItem, setDeleteItem] = useState<IFolder | null>(null);
	const [contextMenu, setContextMenu] = useState<IContextMenu | undefined>(undefined);
	const [selectedItem, setSelectedItem] = useState<{
		type: 'folder' | 'document' | 'default';
		name: string;
		description: string;
	}>({ type: 'default', name: space.name as string, description: space.description as string });

	useEffect(() => {
		if (spaceId) {
			getAllFolder();
		}
	}, [spaceId]);

	useEffect(() => {
		const newFolderData =
			Array.isArray(space?.folders) && space?.folders.length > 0
				? restructureFolders(space.folders)
				: folderOptionalData;

		setFolderData(newFolderData);
		if (!selectedItem || selectedItem.type === 'default') {
			toggleMainDocument();
		}
	}, [space]);

	const getAllFolder = (): void => {
		dispatch(fetchSingleSpaceAction({ data: { id: Number(spaceId) } }));
	};

	const toggleDrawer = (): void => {
		setOpen((prev) => !prev);
	};

	const toggleMainDocument = (): void => {
		setSelectedItem({
			type: 'default',
			name: space.name as string,
			description: space.description as string
		});
	};

	const toggleFolder = (folder: IFolder): void => {
		setOpenFolders((prev) => ({ ...prev, [folder.id]: !prev[folder.id] }));
	};

	const openDocument = (doc: IDocument): void => {
		setSelectedItem({ type: 'document', name: doc.name, description: doc.description });
	};

	const handleCloseContextMenu = (): void => setContextMenu(undefined);

	const handleContextMenu = (
		e: React.MouseEvent<HTMLDivElement>,
		item: IFolder | null,
		type: TMenuOption
	): void => {
		const rect = e.currentTarget.getBoundingClientRect();
		setContextMenu({
			mouseX: rect.left,
			mouseY: rect.bottom,
			type: type,
			target: 'folder',
			item
		});
	};

	const handleNewFolder = (): void => {
		const newName = generateDefaultFolderName(space.folders || []);
		dispatch(
			createFolderAction({
				data: {
					name: newName,
					parentFolderId: contextMenu?.item?.id || null,
					spaceId: Number(spaceId),
					description: ''
				},
				callback: handleCallBack
			})
		);
	};

	const handleCallBack = (data: IAPIResponse<IFolder>) => {
		if (data.success) {
			getAllFolder();
			if (contextMenu?.item) {
				setOpenFolders((prev) => ({ ...prev, [Number(contextMenu?.item?.id)]: true }));
			} else {
				setOpenContent(true);
			}
			setEditingFolderId(data.data?.id || null);
			setContextMenu(undefined);
			showToaster(data.message || 'Created', 'success');
		}
	};

	const handleRenameFolder = (id: number, newName: string) => {
		if (newName.trim() === '') {
			return;
		}
		dispatch(updateFolderAction({ data: { id, name: newName }, callback: renameCallBack }));
	};

	const renameCallBack = (data: IAPIResponse<IFolder>) => {
		if (data.success) {
			getAllFolder();
			setEditingFolderId(null);
			setContextMenu(undefined);
			setIsDeleted(false);
			showToaster(data.message || 'Updated', 'success');
		}
	};

	const handleEditFolder = () => {
		setEditingFolderId(contextMenu?.item?.id || null);
		setContextMenu(undefined);
	};

	const handleConfirm = (confirmed: boolean) => {
		if (confirmed && deleteItem?.id) {
			dispatch(
				deleteFolderAction({
					data: { id: deleteItem?.id },
					callback: handleDeleteCallback
				})
			);
		} else {
			setIsDeleted(false);
			setDeleteItem(null);
		}
	};

	const handleDeleteFolder = () => {
		setIsDeleted(true);
		setDeleteItem(contextMenu?.item || null);
		setContextMenu(undefined);
	};

	const handleDeleteCallback = (data: IAPIResponse<IFolder>) => {
		if (data.success) {
			setFolderData((prev) => prev.filter((f) => f.id !== deleteItem?.id));
			setIsDeleted(false);
			setDeleteItem(null);
			showToaster(data.message || 'Deleted', 'success');
		}
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<IconButton
				onClick={toggleDrawer}
				aria-label="open drawer"
				edge="end"
				sx={ArrowIconStyle(open)}>
				{open ? (
					<Tooltip title="Collapse">
						<ChevronLeft />
					</Tooltip>
				) : (
					<Tooltip title="Expand">
						<ChevronRight />
					</Tooltip>
				)}
			</IconButton>
			<Drawer variant="permanent" open={open} sx={DrawerMenuStyle(open)}>
				{open && (
					<>
						<Toolbar />
						<Box onClick={toggleMainDocument} sx={SpaceNameBox}>
							<MenuBook fontSize="large" />
							<Typography variant="h6" fontWeight="bold">
								{space.name}
							</Typography>
						</Box>
						<Box sx={{ display: 'grid', gridColumn: 1, gridRow: 1 }}>
							<ListItemButton
								sx={ContentButton}
								onClick={() => setOpenContent(!openContent)}
								onMouseEnter={() => setIsHovered(true)}
								onMouseLeave={() => setIsHovered(false)}>
								<Box sx={ContentIconBox}>
									<Box sx={ContentIconInlineBox}>
										{isHovered ? (
											openContent ? (
												<KeyboardArrowDown />
											) : (
												<KeyboardArrowRight />
											)
										) : (
											<FolderCopyOutlined />
										)}
									</Box>
								</Box>
								<Typography sx={{ marginLeft: '8px' }}>Content</Typography>
							</ListItemButton>
							<Box sx={AddIconContentBox}>
								<Tooltip title="create" placement="top">
									<ListItemButton
										sx={AddIconButton}
										onClick={(e) => handleContextMenu(e, null, 'new')}>
										<Add />
									</ListItemButton>
								</Tooltip>
							</Box>
						</Box>
						{openContent && folderData?.length > 0 && (
							<List sx={{ padding: 0 }}>
								{folderData.map((folder) => (
									<FolderListItem
										key={folder.id}
										folder={folder}
										editingFolderId={editingFolderId}
										menuItem={contextMenu?.item}
										openDocument={openDocument}
										openFolder={openFolders}
										toggleFolder={toggleFolder}
										handleContextMenu={handleContextMenu}
										onRenameFolder={handleRenameFolder}
									/>
								))}
								<ListItemButton
									key={'button'}
									onClick={(e) => handleContextMenu(e, null, 'new')}
									sx={createBtn}>
									<Add /> Create
								</ListItemButton>
							</List>
						)}
					</>
				)}
			</Drawer>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<Toolbar />
				<Typography variant="h5">{selectedItem.name}</Typography>
				<Typography variant="body1">{selectedItem.description}</Typography>
			</Box>
			<ConfirmModal
				open={isDeleted}
				title={`Are you sure you want to delete ${deleteItem?.name} ?`}
				subTitle="This action will delete the folder and its related data. Are you sure?"
				onClose={handleConfirm}
			/>
			<NewContextMenu
				open={Boolean(contextMenu)}
				handleOnclose={handleCloseContextMenu}
				position={contextMenu ? { mouseX: contextMenu.mouseX, mouseY: contextMenu.mouseY } : null}
				menuItems={
					contextMenu?.type === 'new'
						? [
								{
									label: 'Document',
									icon: <PostAddOutlined fontSize="small" />
								},
								{ divider: true },
								{
									label: 'Folder',
									icon: <CreateNewFolderOutlined fontSize="small" />,
									handleOnclick: handleNewFolder
								}
							]
						: [
								{
									label: 'Rename',
									icon: <EditOutlined fontSize="small" />,
									handleOnclick: handleEditFolder
								},
								{ divider: true },
								{
									label: 'Delete',
									icon: <DeleteForeverOutlined fontSize="small" />,
									handleOnclick: handleDeleteFolder
								}
							]
				}
			/>
		</Box>
	);
};

export default SpacePage;
