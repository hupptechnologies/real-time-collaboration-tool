'use client';
import React, { useState } from 'react';
import DrawerMenu from '@/components/DrawerMenu';
import { Box } from '@mui/material';
import MuiRichTextEditor from '@/components/rich-text-editor/MuiRichTextEditor';
import { ISelectedItem } from '@/types';

const SpacePage: React.FC = () => {
	const [selectedItem, setSelectedItem] = useState<ISelectedItem>({ type: 'default', item: null });
	return (
		<Box sx={{ display: 'flex' }}>
			<DrawerMenu selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<MuiRichTextEditor
					item={selectedItem.item}
					onContentChange={(newContent) => {
						console.info('newContent', typeof newContent, newContent);
					}}
				/>
			</Box>
		</Box>
	);
};

export default SpacePage;
