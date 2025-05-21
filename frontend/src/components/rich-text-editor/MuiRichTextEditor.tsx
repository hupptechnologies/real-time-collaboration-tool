import { Button, FormControl, MenuItem, Select, Box } from '@mui/material';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import { Link } from '@tiptap/extension-link';
import { Color } from '@tiptap/extension-color';
import {
	MenuButtonBold,
	MenuButtonBulletedList,
	MenuButtonHighlightColor,
	MenuButtonItalic,
	MenuButtonOrderedList,
	MenuButtonEditLink,
	MenuButtonRedo,
	MenuButtonStrikethrough,
	MenuButtonTextColor,
	MenuButtonUnderline,
	MenuButtonUndo,
	MenuControlsContainer,
	MenuDivider,
	MenuButtonIndent,
	MenuSelectHeading,
	RichTextEditor,
	type RichTextEditorRef,
	LinkBubbleMenu,
	TableBubbleMenu,
	LinkBubbleMenuHandler
} from 'mui-tiptap';
import { useRef, useState } from 'react';
import { AlignJustify, AlignLeft, AlignRight } from 'lucide-react';
import { AlignmentBox } from 'styles/editor';

const CustomLinkExtension = Link.extend({
	inclusive: false
});

const MuiRichTextEditor = () => {
	const rteRef = useRef<RichTextEditorRef>(null);
	const [selectedAlignment, setSelectedAlignment] = useState<string>('left');
	const setTextAlignment = (alignment: string) => {
		rteRef.current?.editor?.chain().focus().setTextAlign(alignment).run();
		setSelectedAlignment(alignment);
	};

	const textColors = [
		{ value: '#292A2E', label: 'Charcoal' },
		{ value: '#1558BC', label: 'Blue 1' },
		{ value: '#206A83', label: 'Teal 1' },
		{ value: '#216E4E', label: 'Green 1' },
		{ value: '#E06C00', label: 'Orange 1' },
		{ value: '#AE2E24', label: 'Red 1' },
		{ value: '#803FA5', label: 'Purple 1' },
		{ value: '#7D818E', label: 'Grey 1' },
		{ value: '#357DE8', label: 'Blue 2' },
		{ value: '#2898BD', label: 'Teal 2' },
		{ value: '#22A06B', label: 'Green 2' },
		{ value: '#FCA700', label: 'Orange 2' },
		{ value: '#C9372C', label: 'Red 2' },
		{ value: '#AF59E1', label: 'Purple 2' },
		{ value: '#FFFFFF', label: 'White' },
		{ value: '#CFE1FD', label: 'Blue Tint' },
		{ value: '#C6EDFB', label: 'Sky Tint' },
		{ value: '#BAF3DB', label: 'Mint Tint' },
		{ value: '#F5E989', label: 'Yellow Tint' },
		{ value: '#FFD5D2', label: 'Coral Tint' },
		{ value: '#EED7FC', label: 'Lavender Tint' }
	];

	return (
		<div>
			<RichTextEditor
				ref={rteRef}
				extensions={[
					StarterKit,
					TextStyle,
					TextAlign.configure({
						types: ['heading', 'paragraph', 'image']
					}),
					Highlight.configure({ multicolor: true }),
					Underline,
					CustomLinkExtension.configure({
						autolink: true,
						linkOnPaste: true,
						openOnClick: false
					}),
					LinkBubbleMenuHandler,
					Color
				]}
				content="<p>Hello world</p>"
				renderControls={() => (
					<MenuControlsContainer>
						<MenuButtonUndo />
						<MenuButtonRedo />
						<MenuDivider />

						<MenuSelectHeading labels={{ paragraph: 'Normal text' }} />
						<MenuDivider />

						<MenuButtonBold />
						<MenuButtonItalic />
						<MenuButtonUnderline />
						<MenuButtonStrikethrough />
						<MenuDivider />

						<Box sx={AlignmentBox}>
							<FormControl size="medium" variant="standard">
								<Select
									value={selectedAlignment}
									onChange={(e) => setTextAlignment(e.target.value)}
									disabled={
										rteRef.current?.editor?.isActive('bulletList') ||
										rteRef.current?.editor?.isActive('orderedList')
									}
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
						<MenuDivider />

						<MenuButtonTextColor defaultTextColor={'#000000'} swatchColors={textColors} />
						<MenuButtonHighlightColor
							swatchColors={[
								{ value: '#CFE1FD', label: 'Blue Tint' },
								{ value: '#C6EDFB', label: 'Sky Tint' },
								{ value: '#BAF3DB', label: 'Mint Tint' },
								{ value: '#F5E989', label: 'Yellow Tint' },
								{ value: '#FFD5D2', label: 'Coral Tint' },
								{ value: '#EED7FC', label: 'Lavender Tint' }
							]}
						/>
						<MenuDivider />

						<MenuButtonOrderedList />
						<MenuButtonBulletedList />
						<MenuButtonIndent />
						<MenuDivider />

						<MenuButtonEditLink />
					</MenuControlsContainer>
				)}>
				{() => (
					<>
						<LinkBubbleMenu />
						<TableBubbleMenu />
					</>
				)}
			</RichTextEditor>

			<Button onClick={() => console.info(rteRef.current?.editor?.getHTML())}>Log HTML</Button>
		</div>
	);
};

export default MuiRichTextEditor;
