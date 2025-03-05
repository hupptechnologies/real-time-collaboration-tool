'use client';
import React, { useState } from 'react';
import {
	Box,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
	IconButton,
	Tooltip
} from '@mui/material';
import { TComponent } from '@/types';
import {
	ChevronLeft,
	ChevronRight,
	Home as HomeIcon,
	Description as DescriptionIcon,
	Settings as SettingsIcon
} from '@mui/icons-material';

const drawerWidth = 300;
const DrawerLeft: React.FC<TComponent> = ({ children }: TComponent) => {
	const [open, setOpen] = useState(true);
	const toggleDrawer = (): void => {
		setOpen((prev) => !prev);
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<IconButton
				onClick={toggleDrawer}
				aria-label="open drawer"
				edge="end"
				sx={{
					position: 'absolute',
					top: 72,
					left: open ? 286 : 4,
					zIndex: 1100,
					transition: '0.3s all ease-in-out',
					border: '1px solid #ddd',
					boxShadow: 1,
					width: 24,
					height: 24,
					borderRadius: '50%',
					':hover': {
						backgroundColor: 'primary'
					}
				}}>
				{open ? (
					<Tooltip title="Collaspe">
						<ChevronLeft />
					</Tooltip>
				) : (
					<Tooltip title="Expand">
						<ChevronRight />
					</Tooltip>
				)}
			</IconButton>
			<Drawer
				variant="permanent"
				open={open}
				sx={{
					width: open ? drawerWidth : 15,
					flexShrink: 0,
					zIndex: 1000,
					transition: '0.3s all ease-in-out',
					'& .MuiDrawer-paper': {
						width: open ? drawerWidth : 15,
						overflowX: 'hidden',
						transition: '0.3s all ease-in-out'
					}
				}}>
				<Toolbar />
				<List>
					{[
						{ text: 'Home', icon: <HomeIcon /> },
						{ text: 'Documents', icon: <DescriptionIcon /> },
						{ text: 'Settings', icon: <SettingsIcon /> }
					].map((item) => (
						<ListItem key={item.text} disablePadding>
							<ListItemButton>
								<ListItemIcon>{item.icon}</ListItemIcon>
								<ListItemText primary={item.text} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Drawer>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<Toolbar />
				{children}
			</Box>
		</Box>
	);
};

export default DrawerLeft;
