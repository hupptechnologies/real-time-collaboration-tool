'use client';
import React from 'react';
import DrawerMenu from '@/components/DrawerMenu';
import { Box, Toolbar } from '@mui/material';
import MuiRichTextEditor from '@/components/rich-text-editor/MuiRichTextEditor';
// import RichTextEditor from '@/components/rich-text-editor/RichTextEditor';

const SpacePage: React.FC = () => {
	return (
		<Box sx={{ display: 'flex' }}>
			<DrawerMenu />
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<Toolbar />
				<MuiRichTextEditor />
				{/* <RichTextEditor content={'<p>Test</p>'} onChange={(data) => console.info(data)} /> */}
			</Box>
		</Box>
	);
};

export default SpacePage;
