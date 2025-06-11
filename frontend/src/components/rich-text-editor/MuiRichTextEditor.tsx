import { useRef, useState } from 'react';
import {
	LinkBubbleMenu,
	RichTextEditor,
	RichTextReadOnly,
	TableBubbleMenu,
	type RichTextEditorRef
} from 'mui-tiptap';
import { Button, Container, Box, Fade, Typography } from '@mui/material';
import EditorMenuControls from './EditorMenuControls';
import useExtensions from './useExtensions';
import { EditorContainerBox, EditorWrapperBox, ButtonBox, RichEditorBox } from '@/styles/editor';
import { IPage, ISpace, IMuiRichTextEditorProps } from '@/types';

const MuiRichTextEditor = ({ item, onContentChange }: IMuiRichTextEditorProps) => {
	const rteRef = useRef<RichTextEditorRef>(null);
	const [isEditable, setIsEditable] = useState(false);
	const extensions = useExtensions({
		placeholder: 'Add your own content here...'
	});

	const handleContentChange = (newContent: string) => {
		onContentChange?.(newContent);
	};

	return (
		<Container sx={EditorContainerBox} maxWidth="lg">
			<Box sx={EditorWrapperBox}>
				<Box sx={ButtonBox}>
					<Button variant="contained" onClick={() => setIsEditable(!isEditable)}>
						{isEditable ? 'Save' : 'Edit'}
					</Button>
				</Box>
				<Box>
					<Typography variant="h6">{(item as ISpace)?.name || (item as IPage)?.title}</Typography>
				</Box>
				<Box sx={RichEditorBox}>
					<Fade in={isEditable} timeout={300} unmountOnExit>
						<Box sx={{ display: isEditable ? 'block' : 'none' }}>
							<RichTextEditor
								ref={rteRef}
								editable={true}
								extensions={extensions}
								immediatelyRender={false}
								content={(item as ISpace)?.description || (item as IPage)?.content || ''}
								onUpdate={({ editor }) => handleContentChange(editor.getHTML())}
								renderControls={() => <EditorMenuControls />}>
								{() => (
									<>
										<LinkBubbleMenu />
										<TableBubbleMenu />
									</>
								)}
							</RichTextEditor>
						</Box>
					</Fade>
					<Fade in={!isEditable} timeout={300} unmountOnExit>
						<Box sx={{ display: !isEditable ? 'block' : 'none' }}>
							<RichTextReadOnly
								content={
									(item as ISpace)?.description ||
									(item as IPage)?.content ||
									'Add your own content here...'
								}
								extensions={extensions}
							/>
						</Box>
					</Fade>
				</Box>
			</Box>
		</Container>
	);
};

export default MuiRichTextEditor;
