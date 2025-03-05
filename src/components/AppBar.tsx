'use client';
import React, { useState } from 'react';
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
	Drawer,
	List,
	ListItem,
	ListItemText,
	useTheme,
	Switch,
	useMediaQuery,
	Tooltip,
	ListItemButton
} from '@mui/material';
import { styled } from '@mui/system';
import { SearchOffOutlined, NotificationAddOutlined, MenuBookOutlined } from '@mui/icons-material';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
	background: theme.palette.mode === 'dark' ? '#1a1a1a' : '#ffffff',
	color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
}));

const SearchWrapper = styled(Box)(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
	marginRight: theme.spacing(2),
	marginLeft: theme.spacing(2),
	width: '100%',
	maxWidth: '400px',
	[theme.breakpoints.down('sm')]: {
		display: 'none'
	}
}));

const Header: React.FC = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const [mode, setMode] = useState('light');
	const [mobileOpen, setMobileOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const [searchValue, setSearchValue] = useState('');
	const [notifications] = useState(5);

	// const handleSearch = (value: string): void => {};

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setSearchValue(event.target.value);
		// handleSearch(event.target.value);
	};

	const handleProfileClick = (event: React.MouseEvent<HTMLElement>): void => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (): void => {
		setAnchorEl(null);
	};

	const handleDrawerToggle = (): void => {
		setMobileOpen(!mobileOpen);
	};

	const handleModeToggle = (): void => {
		setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
	};

	const navigationItems = [{ text: 'Home', active: true }];

	const drawer = (
		<List>
			{navigationItems.map((item) => (
				<ListItem key={item.text} disablePadding>
					<ListItemButton
						selected={item.active}
						sx={{
							'&.Mui-selected': {
								backgroundColor: theme.palette.primary.main,
								color: 'white'
							}
						}}>
						<ListItemText primary={item.text} />
					</ListItemButton>
				</ListItem>
			))}
		</List>
	);

	return (
		<>
			<StyledAppBar position="sticky" elevation={2}>
				<Toolbar>
					{isMobile && (
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={handleDrawerToggle}
							sx={{ mr: 2 }}>
							<MenuBookOutlined />
						</IconButton>
					)}

					<Box
						component="img"
						src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9"
						alt="Logo"
						sx={{ height: 40, width: 40, cursor: 'pointer', mr: 2 }}
					/>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ display: { xs: 'none', sm: 'block' } }}>
						Confluence
					</Typography>

					{!isMobile && (
						<Box sx={{ display: 'flex', ml: 4 }}>
							{navigationItems.map((item) => (
								<Typography
									key={item.text}
									sx={{
										mx: 2,
										cursor: 'pointer',
										color: item.active ? theme.palette.primary.main : 'inherit',
										'&:hover': { color: theme.palette.primary.main }
									}}>
									{item.text}
								</Typography>
							))}
						</Box>
					)}
					<Box sx={{ flexGrow: 1 }} />
					<SearchWrapper>
						<InputBase
							placeholder="Search..."
							value={searchValue}
							onChange={handleSearchChange}
							startAdornment={<SearchOffOutlined style={{ marginRight: 8 }} />}
							sx={{ ml: 2, flex: 1 }}
						/>
					</SearchWrapper>
					<Switch checked={mode === 'dark'} onChange={handleModeToggle} color="primary" />
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
			</StyledAppBar>
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
				<MenuItem>Logout</MenuItem>
			</Menu>
			<Drawer
				variant="temporary"
				anchor="left"
				open={mobileOpen}
				onClose={handleDrawerToggle}
				ModalProps={{ keepMounted: true }}>
				{drawer}
			</Drawer>
		</>
	);
};

export default Header;
