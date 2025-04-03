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

const SpacePage: React.FC = () => {
	const params = useParams();
	const dispatch = useAppDispatch();
	const { space } = useAppSelector((state: RootState) => state.space);
	const spaceId = params?.spaceId as string;
	const [open, setOpen] = useState<boolean>(true);
	const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});
	const [selectedItem, setSelectedItem] = useState<{
		type: 'folder' | 'document' | 'default';
		name: string;
		description: string;
	}>({ type: 'default', name: space.name as string, description: space.description as string });

	const data: IFolder[] = [
		{
			name: 'Project A',
			description: 'This is Project A folder.',
			documents: [
				{ name: 'Doc 1', description: 'This is Document 1.' },
				{ name: 'Doc 2', description: 'This is Document 2.' }
			],
			folders: [
				{
					name: 'Subfolder 1',
					description: 'Subfolder 1 inside Project A.',
					documents: [{ name: 'Doc 3', description: 'Document in Subfolder 1.' }],
					folders: [
						{
							name: 'subFolder 2',
							description: 'Subfolder 2 inside Project A.'
						},
						{
							name: 'subFolder 2.1',
							description: 'Subfolder 2.1 inside Project A.',
							documents: [{ name: 'Doc 4', description: 'Document in Subfolder 2.1.' }]
						}
					]
				}
			]
		},
		{
			name: 'Project B',
			description: 'This is Project B folder.',
			documents: [
				{ name: 'Doc 4', description: 'This is Document 4.' },
				{ name: 'Doc 5', description: 'This is Document 5.' }
			]
		}
	];

	useEffect(() => {
		if (spaceId) {
			dispatch(fetchSingleSpaceAction({ data: { id: Number(spaceId) } }));
		}
	}, [spaceId]);

	useEffect(() => {
		toogleMainDocument();
	}, [space]);

	const toggleDrawer = (): void => {
		setOpen((prev) => !prev);
	};

	const toogleMainDocument = () => {
		setSelectedItem({
			type: 'default',
			name: space.name as string,
			description: space.description as string
		});
	};

	const toggleFolder = (_folder: IFolder) => {
		setOpenFolders((prev) => ({ ...prev, [_folder.name]: !prev[_folder.name] }));
		setSelectedItem({ type: 'folder', name: _folder.name, description: _folder.description });
	};

	const openDocument = (_doc: IDocument) => {
		setSelectedItem({ type: 'document', name: _doc.name, description: _doc.description });
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
						{data.length > 0 && (
							<List>
								{data.map((folder, index) => (
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
