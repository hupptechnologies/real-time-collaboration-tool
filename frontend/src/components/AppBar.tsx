'use client';
import React, { useEffect, useState } from 'react';
import { Route } from 'next';
import { useRouter } from 'next/navigation';
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
import { useAuth } from '@/context/AuthContext';
import ConfirmModal from './ConfirmModal';
import {
	appBarStyles,
	navigationItemText,
	searchWrapperStyles,
	iconButtonStyles,
	avatarStyles
} from '@/styles/appbar';

const Header: React.FC = () => {
	const theme = useTheme();
	const router = useRouter();
	const { logout, isAuthenticated } = useAuth();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const { mode, toggleThemeMode } = useThemeContext();
	const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
	const [searchValue, setSearchValue] = useState<string>('');
	const [openModal, setOpenModal] = useState<boolean>(false);
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

	const navigationItems: { text: string; link: Route }[] = [{ text: 'Home', link: '/home' }];

	if (!isAuthenticated) {
		return null;
	}
	return (
		<>
			<AppBar sx={appBarStyles} position="sticky" elevation={0}>
				<Toolbar>
					{isMobile ? (
						<IconButton color="inherit" onClick={handleMenuClick} sx={{ ml: 2 }}>
							<MenuIcon />
						</IconButton>
					) : (
						<Box sx={{ display: 'flex', ml: 4 }}>
							{navigationItems.map((item) => (
								<Typography
									component={'a'}
									key={item.text}
									sx={navigationItemText}
									onClick={() => {
										router.push(item.link);
									}}>
									{item.text}
								</Typography>
							))}
						</Box>
					)}
					<Box sx={{ flexGrow: 1 }} />
					{/* <Box sx={searchWrapperStyles}>
						<InputBase
							aria-label="Search"
							placeholder="Search..."
							value={searchValue}
							onChange={handleSearchChange}
							startAdornment={<SearchOutlined style={{ marginRight: 8 }} />}
							sx={{ ml: 2, flex: 1 }}
						/>
					</Box> */}
					<Switch checked={themeMode === 'dark'} onChange={toggleThemeMode} color="primary" />
					{/* <Tooltip title="Notifications">
						<IconButton color="inherit" sx={iconButtonStyles}>
							<Badge badgeContent={notifications} color="error">
								<NotificationAddOutlined />
							</Badge>
						</IconButton>
					</Tooltip> */}
					<Tooltip title="Account settings">
						<IconButton
							onClick={handleProfileClick}
							size="small"
							sx={{ ml: 2, ...iconButtonStyles }}
							aria-controls={anchorEl ? 'account-menu' : undefined}
							aria-haspopup="true"
							aria-expanded={anchorEl ? 'true' : undefined}>
							<Avatar
								alt="User Profile"
								src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
								sx={avatarStyles}
							/>
						</IconButton>
					</Tooltip>
				</Toolbar>
			</AppBar>
			<Menu
				anchorEl={menuAnchor}
				open={Boolean(menuAnchor)}
				onClose={handleClose}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
				PaperProps={{
					sx: {
						backgroundColor: theme.palette.background.paper,
						color: theme.palette.text.primary,
						borderRadius: '10px',
						boxShadow: theme.shadows[4]
					}
				}}>
				{navigationItems.map((item) => (
					<MenuItem
						key={item.text}
						onClick={() => {
							router.push(item.link);
							handleClose();
						}}
						sx={{
							fontSize: '1.1rem',
							py: 2,
							px: 3,
							color: theme.palette.text.primary,
							'&:hover': {
								backgroundColor: theme.palette.action.hover,
								color: theme.palette.primary.main
							}
						}}>
						{item.text}
					</MenuItem>
				))}
			</Menu>
			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				open={Boolean(anchorEl)}
				onClose={handleClose}
				onClick={handleClose}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
				PaperProps={{
					sx: {
						backgroundColor: theme.palette.background.paper,
						color: theme.palette.text.primary,
						borderRadius: '10px',
						boxShadow: theme.shadows[4]
					}
				}}>
				<MenuItem onClick={() => router.push('/profile')}>Profile</MenuItem>
				<MenuItem>My account</MenuItem>
				<MenuItem onClick={() => setOpenModal(true)}>Logout</MenuItem>
			</Menu>
			<ConfirmModal
				open={openModal}
				title={'Logout ?'}
				subTitle={'Are you sure you want to logout?'}
				onClose={(confirmed: boolean) => {
					if (confirmed) {
						logout();
					}
					setOpenModal(false);
				}}
			/>
		</>
	);
};

export default Header;
