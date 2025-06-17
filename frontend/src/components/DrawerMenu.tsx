import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
	PostAddOutlined,
	FolderOutlined,
	SpaceDashboardOutlined
} from '@mui/icons-material';
import ConfirmModal from '@/components/ConfirmModal';
import FolderListItem from '@/components/home/FolderListItem';
import NewContextMenu from '@/components/home/NewContextMenu';
import PageListItem from '@/components/home/PageListItem';
import { useToaster } from '@/context/ToasterContext';
import { RootState } from '@/redux/store';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { fetchSingleSpaceAction } from '@/redux/space';
import { createFolderAction, deleteFolderAction, updateFolderAction } from '@/redux/folder';
import { createPageAction } from '@/redux/page';
import {
	AddIconButton,
	AddIconContentBox,
	ArrowIconStyle,
	ContentButton,
	ContentIconBox,
	ContentIconInlineBox,
	createBtn,
	DrawerMenuStyle,
	SpaceNameBox,
	EmptyStateContainer,
	EmptyStateIcon,
	EmptyStateTitle,
	EmptyStateDescription
} from '@/styles';
import {
	THandleContextMenuFn,
	IAPIResponse,
	IContextMenu,
	IFolder,
	IPage,
	IPageCreationAttribute
} from '@/types';
import { generateDefaultFolderName, restructureFolders } from '@/utils/common';

const DrawerMenu = () => {
	const params = useParams();
	const router = useRouter();
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

	useEffect(() => {
		if (spaceId) {
			getAllFolder();
		}
	}, [spaceId]);

	useEffect(() => {
		if (Array.isArray(space?.folders) && space?.folders.length > 0) {
			setFolderData(restructureFolders(space.folders));
		} else {
			setFolderData([]);
		}
	}, [space]);

	const getAllFolder = (): void => {
		dispatch(fetchSingleSpaceAction({ data: { id: Number(spaceId) } }));
	};

	const toggleDrawer = (): void => {
		setOpen((prev) => !prev);
	};

	const toggleMainDocument = (): void => {
		router.push(`/home/${spaceId}`);
	};

	const toggleFolder = (folder: IFolder): void => {
		setOpenFolders((prev) => ({ ...prev, [folder.id]: !prev[folder.id] }));
	};

	const openPage = (page: IPage): void => {
		router.push(`/home/${spaceId}?pageId=${page.id}&edit=${page.status === 'draft'}`);
	};

	const handleCloseContextMenu = (): void => setContextMenu(undefined);

	const handleContextMenu: THandleContextMenuFn = (e, item, type): void => {
		const rect = e.currentTarget.getBoundingClientRect();
		setContextMenu({
			mouseX: rect.left,
			mouseY: rect.bottom + 10,
			type: type,
			target: (item as IPage)?.title ? 'page' : 'folder',
			item
		});
	};

	const handleNewPage = (): void => {
		const newPage: IPageCreationAttribute = {
			title: '',
			content: '',
			status: 'draft',
			spaceId: Number(spaceId)
		};
		if (contextMenu?.target === 'folder') {
			if (contextMenu?.item) {
				newPage.folderId = contextMenu?.item?.id;
				newPage.parentId = null;
			} else {
				newPage.parentId = null;
				newPage.folderId = null;
			}
		} else {
			newPage.parentId = contextMenu?.item?.id;
			newPage.folderId = null;
		}
		dispatch(createPageAction({ data: newPage, callback: handleCallBack }));
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

	const handleCallBack = (data: IAPIResponse<IFolder | IPage>) => {
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
			const isPage = (item: any): item is IPage => {
				return item && 'title' in item && 'content' in item;
			};
			if (data.data && isPage(data.data)) {
				openPage(data.data);
			}
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
		setDeleteItem(contextMenu?.item as IFolder | null);
		setContextMenu(undefined);
	};

	const handleDeleteCallback = (data: IAPIResponse<IFolder>) => {
		if (data.success) {
			getAllFolder();
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
							<SpaceDashboardOutlined fontSize="medium" />
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
										data-type="new"
										data-active={contextMenu?.type === 'new' && !contextMenu?.item}
										onClick={(e) => handleContextMenu(e, null, 'new')}>
										<Add />
									</ListItemButton>
								</Tooltip>
							</Box>
						</Box>
						{openContent && (
							<>
								{space.pages && space.pages.length > 0 ? (
									<List sx={{ padding: 0 }}>
										{space.pages.map((page) => (
											<PageListItem
												key={page.id}
												page={page}
												openPage={openPage}
												level={0}
												menuItem={contextMenu?.item as IPage}
												handleContextMenu={handleContextMenu}
											/>
										))}
									</List>
								) : null}
								{folderData?.length > 0 ? (
									<List sx={{ padding: 0 }}>
										{folderData.map((folder) => (
											<FolderListItem
												key={folder.id}
												folder={folder}
												editingFolderId={editingFolderId}
												menuItem={contextMenu?.item}
												openPage={openPage}
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
								) : (
									<Box sx={EmptyStateContainer}>
										<Box sx={EmptyStateIcon}>
											<FolderOutlined />
										</Box>
										<Typography variant="h6" sx={EmptyStateTitle}>
											No pages or folders
										</Typography>
										<Typography variant="body2" sx={EmptyStateDescription}>
											Create a page or folder to start organizing your space
										</Typography>
									</Box>
								)}
							</>
						)}
					</>
				)}
			</Drawer>
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
									label: 'Page',
									icon: <PostAddOutlined fontSize="small" />,
									handleOnclick: handleNewPage
								},
								...(contextMenu?.target === 'folder'
									? [
											{ divider: true as const },
											{
												label: 'Folder',
												icon: <CreateNewFolderOutlined fontSize="small" />,
												handleOnclick: handleNewFolder
											}
										]
									: [])
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

export default DrawerMenu;
