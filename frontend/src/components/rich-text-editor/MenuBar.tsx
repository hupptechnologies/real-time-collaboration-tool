import React, { useState } from 'react';
import { Editor } from '@tiptap/react';
import { Box, MenuItem, Select, FormControl, Divider, Paper } from '@mui/material';
import ColorDropdown from './ColorDropDown';
import {
	AlignJustify,
	AlignLeft,
	AlignRight,
	Bold,
	Italic,
	List,
	ListOrdered,
	Redo,
	Strikethrough,
	Underline,
	Undo
} from 'lucide-react';
import Toggle from './Toggle';
import { AlignmentBox, ColorMainBox, MenuBoxPaper, StyledToggleButtonGroup } from '@/styles';

const MenuBar = ({ editor }: { editor: Editor | null }) => {
	const [selectedHeading, setSelectedHeading] = useState<number>(0);
	const [selectedAlignment, setSelectedAlignment] = useState<string>('left');

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

	const setTextAlignment = (alignment: string) => {
		editor.chain().focus().setTextAlign(alignment).run();
		setSelectedAlignment(alignment);
	};

	return (
		<Paper elevation={0} sx={MenuBoxPaper}>
			<StyledToggleButtonGroup size="small">
				<Toggle
					value={'undo'}
					selected={false}
					onChange={() => editor.chain().focus().undo().run()}
					disabled={!editor.can().undo()}>
					<Undo fontSize="small" />
				</Toggle>
				<Toggle
					value={'redo'}
					selected={false}
					onChange={() => editor.chain().focus().redo().run()}
					disabled={!editor.can().redo()}>
					<Redo fontSize="small" />
				</Toggle>
			</StyledToggleButtonGroup>
			<Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
			<Box
				sx={{ display: 'flex', alignItems: 'center', paddingLeft: '12px', paddingRight: '12px' }}>
				<FormControl size="medium" variant="standard">
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
			</Box>
			<Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
			<StyledToggleButtonGroup size="small">
				<Toggle
					value={'bold'}
					selected={editor.isActive('bold')}
					onChange={() => editor.chain().focus().toggleBold().run()}>
					<Bold fontSize="small" />
				</Toggle>
				<Toggle
					value={'italic'}
					selected={editor.isActive('italic')}
					onChange={() => editor.chain().focus().toggleItalic().run()}>
					<Italic fontSize="small" />
				</Toggle>
				<Toggle
					value={'underline'}
					selected={editor.isActive('underline')}
					onChange={() => editor.chain().focus().toggleUnderline().run()}>
					<Underline fontSize="small" />
				</Toggle>
				<Toggle
					value={'strike'}
					selected={editor.isActive('strike')}
					onChange={() => editor.chain().focus().toggleStrike().run()}>
					<Strikethrough fontSize="small" />
				</Toggle>
			</StyledToggleButtonGroup>
			<Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
			<Box sx={AlignmentBox}>
				<FormControl size="medium" variant="standard">
					<Select
						value={selectedAlignment}
						onChange={(e) => setTextAlignment(e.target.value)}
						disabled={editor.isActive('bulletList') || editor.isActive('orderedList')}
						displayEmpty>
						<MenuItem value="left">
							<AlignLeft />
						</MenuItem>
						<MenuItem value="center">
							<AlignJustify />
						</MenuItem>
						<MenuItem value="right">
							<AlignRight />
						</MenuItem>
					</Select>
				</FormControl>
			</Box>
			<Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
			<Box sx={ColorMainBox}>
				<ColorDropdown onSelect={(color) => editor.chain().focus().setColor(color).run()} />
			</Box>
			<Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
			<StyledToggleButtonGroup size="small">
				<Toggle
					value={'bulletList'}
					selected={editor.isActive('bulletList')}
					onChange={() => editor.chain().focus().toggleBulletList().run()}
					disabled={!editor.isActive('paragraph')}>
					<List fontSize="small" />
				</Toggle>
				<Toggle
					value={'orderedList'}
					selected={editor.isActive('orderedList')}
					onChange={() => editor.chain().focus().toggleOrderedList().run()}
					disabled={!editor.isActive('paragraph')}>
					<ListOrdered fontSize="small" />
				</Toggle>
			</StyledToggleButtonGroup>
		</Paper>
	);
};

export default MenuBar;
