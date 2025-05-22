import { useRef, useState } from 'react';
import {
	LinkBubbleMenu,
	MenuButton,
	RichTextEditor,
	RichTextReadOnly,
	TableBubbleMenu,
	type RichTextEditorRef
} from 'mui-tiptap';
import { Button, Box, Stack, Typography } from '@mui/material';
import { Lock, LockOpen, TextFields } from '@mui/icons-material';
import EditorMenuControls from './EditorMenuControls';
import useExtensions from './useExtensions';
import { exampleContent } from '@/utils/common';

const MuiRichTextEditor = () => {
	const rteRef = useRef<RichTextEditorRef>(null);
	const [isEditable, setIsEditable] = useState(true);
	const [showMenuBar, setShowMenuBar] = useState(true);
	const [submittedContent, setSubmittedContent] = useState('');

	const extensions = useExtensions({
		placeholder: 'Add your own content here...'
	});

	return (
		<div>
			<RichTextEditor
				ref={rteRef}
				editable={isEditable}
				extensions={extensions}
				content={exampleContent}
				renderControls={() => <EditorMenuControls />}
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
