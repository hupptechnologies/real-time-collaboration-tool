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
import FolderForm from '@/components/home/FolderForm';
import FolderContextMenu from '@/components/home/FolderContextMenu';
import DynamicModal from '@/components/DynamicModal';
import { RootState } from '@/redux/store';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { fetchSingleSpaceAction } from '@/redux/space';
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
import { IDocument, IFolder } from '@/types';
import { folderOptionalData } from '@/utils/data';

const restructureFolders = (folders: IFolder[]): IFolder[] => {
	const folderMap: { [key: number]: IFolder } = {};
	const result: IFolder[] = [];

	folders.forEach((folder) => {
		folderMap[folder.id] = { ...folder, folders: [] };
	});

	folders.forEach((folder) => {
		if (folder.parentFolderId === null) {
			result.push(folderMap[folder.id]);
		} else {
			const parentFolder = folderMap[folder.parentFolderId];
			if (parentFolder && Array.isArray(parentFolder.folders)) {
				parentFolder.folders.push(folderMap[folder.id]);
			}
		}
	});

	return result;
};

const SpacePage: React.FC = () => {
	const params = useParams();
	const dispatch = useAppDispatch();
	const { space } = useAppSelector((state: RootState) => state.space);
	const spaceId = params?.spaceId as string;
	const [open, setOpen] = useState<boolean>(true);
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [openContent, setOpenContent] = useState<boolean>(false);
	const [folderData, setFolderData] = useState<IFolder[]>([]);
	const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});
	const [contextMenu, setContextMenu] = useState<
		| {
				mouseX: number;
				mouseY: number;
				target: 'folder' | 'document';
				// item: IFolder | IDocument | null;
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
			dispatch(fetchSingleSpaceAction({ data: { id: Number(spaceId) } }));
		}
	}, [spaceId]);

	useEffect(() => {
		toogleMainDocument();
		if (Array.isArray(space?.folders) && space?.folders.length > 0) {
			setFolderData(restructureFolders(space?.folders));
		} else {
			setFolderData(folderOptionalData);
		}
	}, [space]);

	const toggleDrawer = (): void => {
		setOpen((prev) => !prev);
	};

	const toogleMainDocument = (): void => {
		setSelectedItem({
			type: 'default',
			name: space.name as string,
			description: space.description as string
		});
	};

	const toggleFolder = (folder: IFolder): void => {
		setOpenFolders((prev) => ({ ...prev, [folder.name]: !prev[folder.name] }));
	};

	const openDocument = (doc: IDocument): void => {
		setSelectedItem({ type: 'document', name: doc.name, description: doc.description });
	};

	const handleClose = (): void => setContextMenu(undefined);

	const handleContextMenu = (e: React.MouseEvent<HTMLButtonElement>): void => {
		const rect = e.currentTarget.getBoundingClientRect();
		setContextMenu({
			mouseX: rect.left,
			mouseY: rect.bottom,
			target: 'folder'
		});
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
						<Box onClick={toogleMainDocument} sx={SpaceNameBox}>
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
								<Button sx={AddIconButton} onClick={handleContextMenu}>
									<Add />
								</Button>
							</Box>
						</Box>
						{openContent && folderData?.length > 0 && (
							<List>
								{folderData.map((folder, index) => (
									<FolderListItem
										key={index}
										folder={folder}
										openDocument={openDocument}
										openFolder={openFolders}
										toggleFolder={toggleFolder}
										handleContextMenu={handleContextMenu}
									/>
								))}
								<Box component={'span'} onClick={handleContextMenu} sx={createBtn}>
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
			<FolderContextMenu
				open={Boolean(contextMenu)}
				onClose={handleClose}
				position={contextMenu ? { mouseX: contextMenu.mouseX, mouseY: contextMenu.mouseY } : null}
			/>
			<DynamicModal
				title="New Folder"
				open={openModal}
				onClose={() => setOpenModal(false)}
				content={
					<FolderForm
						handleSubmit={() => {}}
						setOpen={setOpenModal}
						spaceId={Number(spaceId)}
						parentFolderId={null}
					/>
				}
			/>
		</Box>
	);
};

export default SpacePage;
