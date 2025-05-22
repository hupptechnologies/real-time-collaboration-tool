import { Button, Box, Stack, Typography } from '@mui/material';
import StarterKit from '@tiptap/starter-kit';
import { TextAlign } from '@tiptap/extension-text-align';
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
	LinkBubbleMenuHandler,
	MenuButton,
	RichTextReadOnly,
	MenuSelectTextAlign
} from 'mui-tiptap';
import { useRef, useState } from 'react';
import { LockOpen, TextFields, Lock } from '@mui/icons-material';

const CustomLinkExtension = Link.extend({
	inclusive: false
});

const MuiRichTextEditor = () => {
	const rteRef = useRef<RichTextEditorRef>(null);
	const [isEditable, setIsEditable] = useState(true);
	const [showMenuBar, setShowMenuBar] = useState(true);
	const [submittedContent, setSubmittedContent] = useState('');

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

	const extensions = [
		StarterKit,
		TextStyle,
		TextAlign.configure({
			types: ['heading', 'paragraph'],
			alignments: ['left', 'right', 'center'],
			defaultAlignment: 'left'
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
	];

	return (
		<div>
			<RichTextEditor
				ref={rteRef}
				editable={isEditable}
				extensions={extensions}
				content={
					'<h2 style="text-align: center">Hey there 👋</h2><p>This is a <em>basic</em> example of <code>mui-tiptap</code>, which combines <a target="_blank" rel="noopener noreferrer nofollow" href="https://tiptap.dev/">Tiptap</a> with customizable <a target="_blank" rel="noopener noreferrer nofollow" href="https://mui.com/">MUI (Material-UI)</a> styles, plus a suite of additional components and extensions! Sure, there are <strong>all <em>kinds</em> of <s>text</s> <u>formatting</u> options</strong> you’d probably expect from a rich text editor. But wait until you see the <span data-type="mention" data-id="15" data-label="Axl Rose">@Axl Rose</span> mentions and lists:</p><ul><li><p>That’s a bullet list with one …</p></li><li><p>… or two list items.</p></li></ul><p>Isn’t that great? And all of that is editable. <strong><span style="color: #ff9900">But wait, </span><span style="color: #403101"><mark data-color="#ffd699" style="background-color: #ffd699; color: inherit">there’s more!</mark></span></strong> Let’s try a code block:</p><pre><code class="language-css">body {\n  display: none;\n}</code></pre><p></p><p>That’s only the tip of the iceberg. Feel free to add and resize images:</p><img height="auto" src="https://picsum.photos/600/400" alt="random image" width="350" style="aspect-ratio: 3 / 2"><p></p><p>Organize information in tables:</p><table><tbody><tr><th colspan="1" rowspan="1"><p>Name</p></th><th colspan="1" rowspan="1"><p>Role</p></th><th colspan="1" rowspan="1"><p>Team</p></th></tr><tr><td colspan="1" rowspan="1"><p>Alice</p></td><td colspan="1" rowspan="1"><p>PM</p></td><td colspan="1" rowspan="1"><p>Internal tools</p></td></tr><tr><td colspan="1" rowspan="1"><p>Bob</p></td><td colspan="1" rowspan="1"><p>Software</p></td><td colspan="1" rowspan="1"><p>Infrastructure</p></td></tr></tbody></table><p></p><p>Or write down your groceries:</p><ul data-type="taskList"><li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"><span></span></label><div><p>Milk</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Eggs</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Sriracha</p></div></li></ul><blockquote><p>Wow, that’s amazing. Good work! 👏 <br>— Mom</p></blockquote><p>Give it a try and click around!</p>'
				}
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

						<MenuSelectTextAlign />
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
				)}
				RichTextFieldProps={{
					variant: 'outlined',
					MenuBarProps: {
						hide: !showMenuBar
					},
					footer: (
						<Stack
							direction="row"
							spacing={2}
							sx={{
								borderTopStyle: 'solid',
								borderTopWidth: 1,
								borderTopColor: (theme) => theme.palette.divider,
								py: 1,
								px: 1.5
							}}>
							<MenuButton
								value="formatting"
								tooltipLabel={showMenuBar ? 'Hide formatting' : 'Show formatting'}
								size="small"
								onClick={() => setShowMenuBar((currentState) => !currentState)}
								selected={showMenuBar}
								IconComponent={TextFields}
							/>

							<MenuButton
								value="formatting"
								tooltipLabel={isEditable ? 'Prevent edits (use read-only mode)' : 'Allow edits'}
								size="small"
								onClick={() => setIsEditable((currentState) => !currentState)}
								selected={!isEditable}
								IconComponent={isEditable ? LockOpen : Lock}
							/>

							<Button
								variant="contained"
								size="small"
								onClick={() => {
									setSubmittedContent(rteRef.current?.editor?.getHTML() ?? '');
								}}>
								Save
							</Button>
						</Stack>
					)
				}}>
				{() => (
					<>
						<LinkBubbleMenu />
						<TableBubbleMenu />
					</>
				)}
			</RichTextEditor>

			<Typography variant="h5" sx={{ mt: 5 }}>
				Saved result:
			</Typography>

			{submittedContent ? (
				<>
					<pre style={{ marginTop: 10, overflow: 'auto', maxWidth: '100%' }}>
						<code>{submittedContent}</code>
					</pre>

					<Box mt={3}>
						<Typography variant="overline" sx={{ mb: 2 }}>
							Read-only saved snapshot:
						</Typography>

						<RichTextReadOnly content={submittedContent} extensions={extensions} />
					</Box>
				</>
			) : (
				<>
					Press “Save” above to show the HTML markup for the editor content. Typically you’d use a
					similar <code>editor.getHTML()</code> approach to save your data in a form.
				</>
			)}
		</div>
	);
};

export default MuiRichTextEditor;
