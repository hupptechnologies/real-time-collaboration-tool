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
	Divider,
	Button
} from '@mui/material';
import { ChevronLeft, ChevronRight, MenuBook } from '@mui/icons-material';
import FolderListItem from '@/components/FolderListItem';
import { RootState } from '@/redux/store';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { fetchSingleSpaceAction } from '@/redux/space';
import { ArrowIconStyle, DrawerMenuStyle, SpaceNameBox } from '@/styles';
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
	const [folderData, setFolderData] = useState<IFolder[]>([]);
	const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});
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
		setSelectedItem({ type: 'folder', name: folder.name, description: folder.description });
	};

	const openDocument = (doc: IDocument): void => {
		setSelectedItem({ type: 'document', name: doc.name, description: doc.description });
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
						<Box sx={{ padding: '16px 0' }}>
							<Button variant="outlined" fullWidth>
								New Folder
							</Button>
						</Box>
						<Divider />
						{folderData?.length > 0 && (
							<List>
								{folderData.map((folder, index) => (
									<FolderListItem
										key={index}
										folder={folder}
										openDocument={openDocument}
										openFolder={openFolders}
										toggleFolder={toggleFolder}
									/>
								))}
								<Divider />
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
		</Box>
	);
};

export default SpacePage;
