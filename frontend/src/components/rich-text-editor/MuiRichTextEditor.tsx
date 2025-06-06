import { useRef, useState } from 'react';
import {
	LinkBubbleMenu,
	RichTextEditor,
	RichTextReadOnly,
	TableBubbleMenu,
	type RichTextEditorRef
} from 'mui-tiptap';
import { Button, Container, Box, Fade } from '@mui/material';
import EditorMenuControls from './EditorMenuControls';
import useExtensions from './useExtensions';
import { EditorContainerBox, EditorWrapperBox, ButtonBox, RichEditorBox } from '@/styles/editor';

interface MuiRichTextEditorProps {
	content: string;
	onContentChange?: (_content: string) => void;
}

const MuiRichTextEditor = ({ content, onContentChange }: MuiRichTextEditorProps) => {
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
				<Box sx={RichEditorBox}>
					<Fade in={isEditable} timeout={300} unmountOnExit>
						<Box sx={{ display: isEditable ? 'block' : 'none' }}>
							<RichTextEditor
								ref={rteRef}
								editable={true}
								extensions={extensions}
								content={content}
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
							<RichTextReadOnly content={content} extensions={extensions} />
						</Box>
					</Fade>
				</Box>
			</Box>
		</Container>
	);
};

export default MuiRichTextEditor;
