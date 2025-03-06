'use client';
import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
import {
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Avatar,
	Badge,
	InputBase,
	Menu,
	MenuItem,
	Box,
	Switch,
	useTheme,
	useMediaQuery,
	Tooltip
} from '@mui/material';
import { Menu as MenuIcon, SearchOutlined, NotificationAddOutlined } from '@mui/icons-material';
import { useThemeContext } from '@/context/ThemeContext';
import { appBarStyles, navigationItemText, searchWrapperStyles } from '@/styles';
import { useAuth } from '@/context/AuthContext';

const Header: React.FC = () => {
	const theme = useTheme();
	const { logout } = useAuth();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const { mode, toggleThemeMode } = useThemeContext();
	const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
	const [searchValue, setSearchValue] = useState<string>('');
	const [notifications] = useState<number>(5);

	useEffect(() => {
		if (mode === 'light' || mode === 'dark') {
			setThemeMode(mode);
		}
	}, [mode]);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setSearchValue(event.target.value);
	};

	const handleProfileClick = (event: React.MouseEvent<HTMLElement>): void => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClick = (event: React.MouseEvent<HTMLElement>): void => {
		setMenuAnchor(event.currentTarget);
	};

	const handleClose = (): void => {
		setAnchorEl(null);
		setMenuAnchor(null);
	};

	const navigationItems = [{ text: 'Home' }, { text: 'Recent' }, { text: 'Spaces' }];
	return (
		<>
			<AppBar sx={appBarStyles} position="sticky" elevation={2}>
				<Toolbar>
					{/* {isMobile ? (
						<Image src="/assets/mobile-logo.svg" alt="Mobile Logo" width={100} height={30} />
					) : (
						<Image src="/assets/logo.svg" alt="Logo" width={120} height={50} />
					)} */}
					{/* Mobile View - Show Menu Icon */}
					{isMobile ? (
						<IconButton color="inherit" onClick={handleMenuClick} sx={{ ml: 2 }}>
							<MenuIcon />
						</IconButton>
					) : (
						/* Desktop View - Show Navigation Items */
						<Box sx={{ display: 'flex', ml: 4 }}>
							{navigationItems.map((item) => (
								<Typography key={item.text} sx={navigationItemText}>
									{item.text}
								</Typography>
							))}
						</Box>
					)}
					<Box sx={{ flexGrow: 1 }} />
					<Box sx={searchWrapperStyles}>
						<InputBase
							placeholder="Search..."
							value={searchValue}
							onChange={handleSearchChange}
							startAdornment={<SearchOutlined style={{ marginRight: 8 }} />}
							sx={{ ml: 2, flex: 1 }}
						/>
					</Box>
					<Switch checked={themeMode === 'dark'} onChange={toggleThemeMode} color="primary" />
					<Tooltip title="Notifications">
						<IconButton color="inherit">
							<Badge badgeContent={notifications} color="error">
								<NotificationAddOutlined />
							</Badge>
						</IconButton>
					</Tooltip>
					<Tooltip title="Account settings">
						<IconButton
							onClick={handleProfileClick}
							size="small"
							sx={{ ml: 2 }}
							aria-controls={Boolean(anchorEl) ? 'account-menu' : undefined}
							aria-haspopup="true"
							aria-expanded={Boolean(anchorEl) ? 'true' : undefined}>
							<Avatar
								alt="User Profile"
								src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
								sx={{ width: 32, height: 32 }}
							/>
						</IconButton>
					</Tooltip>
				</Toolbar>
			</AppBar>
			{/* Mobile Menu */}
			<Menu
				anchorEl={menuAnchor}
				open={Boolean(menuAnchor)}
				onClose={handleClose}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
				{navigationItems.map((item) => (
					<MenuItem key={item.text} onClick={handleClose}>
						{item.text}
					</MenuItem>
				))}
			</Menu>
			{/* Account Menu */}
			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				open={Boolean(anchorEl)}
				onClose={handleClose}
				onClick={handleClose}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
				<MenuItem>Profile</MenuItem>
				<MenuItem>My account</MenuItem>
				<MenuItem onClick={logout}>Logout</MenuItem>
			</Menu>
		</>
	);
};

export default Header;
