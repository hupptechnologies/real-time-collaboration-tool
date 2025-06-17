'use client';
import React from 'react';
import { Box } from '@mui/material';
import DrawerMenu from '@/components/DrawerMenu';
import MuiRichTextEditor from '@/components/rich-text-editor/MuiRichTextEditor';

const SpacePage: React.FC = () => {
	return (
		<Box sx={{ display: 'flex' }}>
			<DrawerMenu />
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<MuiRichTextEditor />
			</Box>
		</Box>
	);
};

export default SpacePage;
