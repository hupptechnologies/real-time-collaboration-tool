'use client';
import React, { useState, useEffect } from 'react';
import {
	Box,
	Drawer,
	List,
	ListItemButton,
	ListItemText,
	Toolbar,
	IconButton,
	Tooltip,
	Typography,
	Collapse,
	ListItemIcon
} from '@mui/material';
import {
	ChevronLeft,
	ChevronRight,
	Description,
	ExpandLess,
	ExpandMore,
	Folder,
	MenuBook
} from '@mui/icons-material';
import { ArrowIconStyle, DrawerMenuStyle, SpaceNameBox } from '@/styles';
import { IDocument, IDrawerLeftProps, IFolder } from '@/types';

const DrawerLeft: React.FC<IDrawerLeftProps> = ({ name, description, data }) => {
	const [open, setOpen] = useState<boolean>(true);
	const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});
	const [selectedItem, setSelectedItem] = useState<{
		type: 'folder' | 'document' | 'default';
		name: string;
		description: string;
	}>({ type: 'default', name, description });

	const toggleFolder = (_folder: IFolder) => {
		setOpenFolders((prev) => ({ ...prev, [_folder.name]: !prev[_folder.name] }));
		setSelectedItem({ type: 'folder', name: _folder.name, description: _folder.description });
	};

	const openDocument = (_doc: IDocument) => {
		setSelectedItem({ type: 'document', name: _doc.name, description: _doc.description });
	};

	useEffect(() => {
		toogleMainDocument();
	}, [name, description]);

	const toggleDrawer = (): void => {
		setOpen((prev) => !prev);
	};

	const toogleMainDocument = () => {
		setSelectedItem({ type: 'default', name, description });
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
				<Toolbar />
				<Box onClick={toogleMainDocument} sx={SpaceNameBox}>
					<MenuBook fontSize="large" />
					<Typography variant="h6" fontWeight="bold">
						{name}
					</Typography>
				</Box>
				<List>
					{data.map((folder, index) => (
						<div key={index}>
							<ListItemButton onClick={() => toggleFolder(folder)}>
								<ListItemIcon>
									<Folder />
								</ListItemIcon>
								<ListItemText primary={folder.name} />
								{openFolders[folder.name] ? <ExpandLess /> : <ExpandMore />}
							</ListItemButton>
							<Collapse in={openFolders[folder.name]} timeout="auto" unmountOnExit>
								<List component="div" disablePadding>
									{folder.documents?.map((doc, docIndex) => (
										<ListItemButton key={docIndex} sx={{ pl: 4 }} onClick={() => openDocument(doc)}>
											<Description sx={{ mr: 1 }} />
											<ListItemText primary={doc.name} />
										</ListItemButton>
									))}
									{folder.folders?.map((subfolder, subIndex) => (
										<div key={subIndex}>
											<ListItemButton sx={{ pl: 4 }} onClick={() => toggleFolder(subfolder)}>
												<ListItemIcon>
													<Folder />
												</ListItemIcon>
												<ListItemText primary={subfolder.name} />
												{openFolders[subfolder.name] ? <ExpandLess /> : <ExpandMore />}
											</ListItemButton>
											<Collapse in={openFolders[subfolder.name]} timeout="auto" unmountOnExit>
												<List component="div" disablePadding>
													{subfolder.documents?.map((doc, subDocIndex) => (
														<ListItemButton
															key={subDocIndex}
															sx={{ pl: 6 }}
															onClick={() => openDocument(doc)}>
															<Description sx={{ mr: 1 }} />
															<ListItemText primary={doc.name} />
														</ListItemButton>
													))}
												</List>
											</Collapse>
										</div>
									))}
								</List>
							</Collapse>
						</div>
					))}
				</List>
			</Drawer>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<Toolbar />
				<Typography variant="h5">{selectedItem.name}</Typography>
				<Typography variant="body1">{selectedItem.description}</Typography>
			</Box>
		</Box>
	);
};

export default DrawerLeft;
