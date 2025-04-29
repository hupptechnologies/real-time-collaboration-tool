'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Box, Drawer, List, Toolbar, IconButton, Tooltip, Typography, Button } from '@mui/material';
import {
	Add,
	ChevronLeft,
	ChevronRight,
	KeyboardArrowDown,
	KeyboardArrowRight,
	MenuBook
} from '@mui/icons-material';
import FolderListItem from '@/components/home/FolderListItem';
import NewContextMenu from '@/components/home/NewContextMenu';
import { useToaster } from '@/context/ToasterContext';
import { RootState } from '@/redux/store';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { fetchSingleSpaceAction } from '@/redux/space';
import { createFolderAction, updateFolderAction } from '@/redux/folder';
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
import { IAPIResponse, IDocument, IFolder } from '@/types';
import { folderOptionalData, restructureFolders } from '@/utils/common';

const SpacePage: React.FC = () => {
	const params = useParams();
	const dispatch = useAppDispatch();
	const { showToaster } = useToaster();
	const { space } = useAppSelector((state: RootState) => state.space);
	const spaceId = params?.spaceId as string;
	const [open, setOpen] = useState<boolean>(true);
	const [openContent, setOpenContent] = useState<boolean>(false);
	const [folderData, setFolderData] = useState<IFolder[]>([]);
	const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});
	const [editingFolderId, setEditingFolderId] = useState<number | null>(null);
	const [contextMenu, setContextMenu] = useState<
		| {
				mouseX: number;
				mouseY: number;
				target: 'folder' | 'document';
				item: IFolder | null;
		  }
		| undefined
	>(undefined);
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
		toggleMainDocument();
		const newFolderData =
			Array.isArray(space?.folders) && space?.folders.length > 0
				? restructureFolders(space.folders)
				: folderOptionalData;

		setFolderData(newFolderData);
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

	const handleClose = (): void => setContextMenu(undefined);

	const handleContextMenu = (
		e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLSpanElement>,
		item: IFolder | null
	): void => {
		const rect = e.currentTarget.getBoundingClientRect();
		setContextMenu({
			mouseX: rect.left,
			mouseY: rect.bottom,
			target: 'folder',
			item
		});
	};

	const handleNewFolder = (): void => {
		dispatch(
			createFolderAction({
				data: {
					name: `Untitled Folder ${(space.folders?.length || 0) + 1}`,
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
			showToaster(data.message || 'success', 'success');
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
			showToaster(data.message || 'success', 'success');
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
							<Button sx={ContentButton} onClick={() => setOpenContent(!openContent)}>
								<Box sx={ContentIconBox}>
									<Box sx={ContentIconInlineBox}>
										{openContent ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
									</Box>
								</Box>
								<Typography sx={{ marginLeft: '8px' }}>Content</Typography>
							</Button>
							<Box sx={AddIconContentBox}>
								<Button sx={AddIconButton} onClick={(e) => handleContextMenu(e, null)}>
									<Add />
								</Button>
							</Box>
						</Box>
						{openContent && folderData?.length > 0 && (
							<List>
								{folderData.map((folder) => (
									<FolderListItem
										key={folder.id}
										folder={folder}
										editingFolderId={editingFolderId}
										openDocument={openDocument}
										openFolder={openFolders}
										toggleFolder={toggleFolder}
										handleContextMenu={handleContextMenu}
										setEditingFolderId={setEditingFolderId}
										onRenameFolder={handleRenameFolder}
									/>
								))}
								<Box component={'span'} onClick={(e) => handleContextMenu(e, null)} sx={createBtn}>
									<Add /> Create
								</Box>
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
			<NewContextMenu
				open={Boolean(contextMenu)}
				onClose={handleClose}
				position={contextMenu ? { mouseX: contextMenu.mouseX, mouseY: contextMenu.mouseY } : null}
				handleNewFolder={handleNewFolder}
			/>
		</Box>
	);
};

export default SpacePage;
