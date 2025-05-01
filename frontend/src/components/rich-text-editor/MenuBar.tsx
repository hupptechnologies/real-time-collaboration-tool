import React, { useState } from 'react';
import { Editor } from '@tiptap/react';
import { Box, MenuItem, Select, FormControl, Divider } from '@mui/material';
import { Bold, Italic, List, ListOrdered, Redo, Strikethrough, Undo } from 'lucide-react';
import Toggle from './Toggle';
import { MenuOptionBox } from '@/styles';

const MenuBar = ({ editor }: { editor: Editor | null }) => {
	const [selectedHeading, setSelectedHeading] = useState<number>(0);

	if (!editor) {
		return null;
	}

	const setHeading = (level: any) => {
		editor.chain().focus().toggleHeading({ level }).run();
		setSelectedHeading(level);
	};

	const setParagraph = () => {
		editor.chain().focus().setParagraph().run();
		setSelectedHeading(0);
	};

	const HeadingDropdown = (
		<FormControl size="small" variant="outlined">
			<Select
				value={selectedHeading}
				onChange={(e) => setHeading(Number(e.target.value))}
				displayEmpty
				disabled={editor.isActive('bulletList') || editor.isActive('orderedList')}>
				<MenuItem value={0} onClick={setParagraph}>
					Normal Text
				</MenuItem>
				{[1, 2, 3, 4, 5, 6].map((level) => (
					<MenuItem key={level} value={level}>
						Heading {level}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);

	const Options = [
		{
			icon: <Undo fontSize="small" />,
			onClick: () => editor.chain().focus().undo().run(),
			preesed: false,
			disabled: !editor.can().undo()
		},
		{
			icon: <Redo fontSize="small" />,
			onClick: () => editor.chain().focus().redo().run(),
			preesed: false,
			disabled: !editor.can().redo()
		},
		{
			divider: true
		},
		{
			icon: <Bold fontSize="small" />,
			onClick: () => editor.chain().focus().toggleBold().run(),
			preesed: editor.isActive('bold')
		},
		{
			icon: <Italic fontSize="small" />,
			onClick: () => editor.chain().focus().toggleItalic().run(),
			preesed: editor.isActive('italic')
		},
		{
			icon: <Strikethrough fontSize="small" />,
			onClick: () => editor.chain().focus().toggleStrike().run(),
			preesed: editor.isActive('strike')
		},
		{
			divider: true
		},
		{
			icon: <List fontSize="small" />,
			onClick: () => editor.chain().focus().toggleBulletList().run(),
			preesed: editor.isActive('bulletList'),
			disabled: !editor.isActive('paragraph')
		},
		{
			icon: <ListOrdered fontSize="small" />,
			onClick: () => editor.chain().focus().toggleOrderedList().run(),
			preesed: editor.isActive('orderedList'),
			disabled: !editor.isActive('paragraph')
		}
	];

	return (
		<Box sx={MenuOptionBox}>
			{HeadingDropdown}
			<Divider orientation="vertical" flexItem />
			{Options.map((option, index) =>
				option.divider ? (
					<Divider key={index} orientation="vertical" flexItem />
				) : (
					<Toggle
						key={index}
						value={index}
						selected={option.preesed}
						onChange={option.onClick}
						disabled={option.disabled}>
						{option.icon}
					</Toggle>
				)
			)}
		</Box>
	);
};

export default MenuBar;
