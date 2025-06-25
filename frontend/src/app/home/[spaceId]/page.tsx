'use client';
import React, { useState } from 'react';
import { Box, IconButton, useMediaQuery } from '@mui/material';
import { Menu } from '@mui/icons-material';
import DrawerMenu from '@/components/DrawerMenu';
import MuiRichTextEditor from '@/components/rich-text-editor/MuiRichTextEditor';
import { MenuIconButtonStyle } from '@/styles/common';

const SpacePage: React.FC = () => {
	const isMobile = useMediaQuery('(max-width:767px)');
	const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

	const handleMobileDrawerToggle = () => {
		setMobileDrawerOpen(!mobileDrawerOpen);
	};

	return (
		<Box sx={{ display: 'flex' }}>
			{isMobile && (
				<IconButton onClick={handleMobileDrawerToggle} sx={MenuIconButtonStyle}>
					<Menu />
				</IconButton>
			)}
			<DrawerMenu
				isMobile={isMobile}
				mobileDrawerOpen={mobileDrawerOpen}
				onMobileDrawerToggle={handleMobileDrawerToggle}
			/>
			<Box component="main" sx={{ flexGrow: 1, p: 3, mt: 0 }}>
				<MuiRichTextEditor />
			</Box>
		</Box>
	);
};

export default SpacePage;
