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
	Tooltip,
	Typography
} from '@mui/material';
import {
	ChevronLeft,
	ChevronRight,
	Home as HomeIcon,
	Description as DescriptionIcon,
	Settings as SettingsIcon
} from '@mui/icons-material';
import { ArrowIconStyle, DrawerMenuStyle } from '@/styles';
interface DrawerLeftProps {
	children?: React.ReactNode;
	name: string;
}

const DrawerLeft: React.FC<DrawerLeftProps> = ({ name }) => {
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
				sx={ArrowIconStyle(open)}>
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
			<Drawer variant="permanent" open={open} sx={DrawerMenuStyle(open)}>
				<Toolbar />
				<Box>
					<Typography variant="h4">{name}</Typography>
				</Box>
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
				{/* {children} */}
			</Box>
		</Box>
	);
};

export default DrawerLeft;
