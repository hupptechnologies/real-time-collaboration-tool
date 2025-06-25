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
	Menu,
	MenuItem,
	Box,
	useTheme,
	useMediaQuery,
	Tooltip
} from '@mui/material';
import { LightMode, DarkMode, HomeOutlined } from '@mui/icons-material';
import { useThemeContext } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import ConfirmModal from './ConfirmModal';
import { appBarStyles, navigationItemText, iconButtonStyles, avatarStyles } from '@/styles/appbar';

const Header: React.FC = () => {
	const theme = useTheme();
	const router = useRouter();
	const { logout, isAuthenticated } = useAuth();
	const isMobile = useMediaQuery('(max-width:767px)');
	const { mode, toggleThemeMode } = useThemeContext();
	const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const [openModal, setOpenModal] = useState<boolean>(false);
	useEffect(() => {
		if (mode === 'light' || mode === 'dark') {
			setThemeMode(mode);
		}
	}, [mode]);

	const handleProfileClick = (event: React.MouseEvent<HTMLElement>): void => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (): void => {
		setAnchorEl(null);
	};

	const navigationItems: { text: string; icon: React.ReactNode; link: Route }[] = [
		{ text: 'Home', icon: <HomeOutlined />, link: '/home' }
	];

	if (!isAuthenticated) {
		return null;
	}
	return (
		<>
			<AppBar sx={appBarStyles} position="sticky" elevation={0}>
				<Toolbar>
					<Box sx={{ display: 'flex', ml: 4 }}>
						{navigationItems.map((item) => (
							<Typography
								component={'a'}
								key={item.text}
								sx={navigationItemText}
								onClick={() => {
									router.push(item.link);
								}}>
								{isMobile ? item.icon : item.text}
							</Typography>
						))}
					</Box>
					<Box sx={{ flexGrow: 1 }} />
					<IconButton
						color="inherit"
						onClick={toggleThemeMode}
						sx={{ ml: 1 }}
						aria-label="toggle theme">
						{themeMode === 'dark' ? <DarkMode /> : <LightMode />}
					</IconButton>
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
