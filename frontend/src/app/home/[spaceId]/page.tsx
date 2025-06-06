'use client';
import React, { useState } from 'react';
import DrawerMenu from '@/components/DrawerMenu';
import { Box } from '@mui/material';
import MuiRichTextEditor from '@/components/rich-text-editor/MuiRichTextEditor';
import { exampleContent } from '@/utils/common';

const SpacePage: React.FC = () => {
	const [content, setContent] = useState(exampleContent);
	return (
		<Box sx={{ display: 'flex' }}>
			<DrawerMenu />
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<MuiRichTextEditor
					content={content}
					onContentChange={(newContent) => {
						setContent(newContent);
					}}
				/>
			</Box>
		</Box>
	);
};

export default SpacePage;
