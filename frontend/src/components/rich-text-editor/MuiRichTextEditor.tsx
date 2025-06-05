import { useRef, useState } from 'react';
import {
	LinkBubbleMenu,
	RichTextEditor,
	RichTextReadOnly,
	TableBubbleMenu,
	type RichTextEditorRef
} from 'mui-tiptap';
import { Button, Container, Box } from '@mui/material';
import EditorMenuControls from './EditorMenuControls';
import useExtensions from './useExtensions';
import { exampleContent } from '@/utils/common';
import { EditorContainerBox, EditorWrapperBox, ButtonBox, RichEditorBox } from '@/styles/editor';

const MuiRichTextEditor = () => {
	const rteRef = useRef<RichTextEditorRef>(null);
	const [isEditable, setIsEditable] = useState(false);
	const extensions = useExtensions({
		placeholder: 'Add your own content here...'
	});

	return (
		<Container sx={EditorContainerBox} maxWidth="lg">
			<Box sx={EditorWrapperBox}>
				<Box sx={ButtonBox}>
					<Button variant="contained" onClick={() => setIsEditable(!isEditable)}>
						{isEditable ? 'Save' : 'Edit'}
					</Button>
				</Box>
				<Box sx={RichEditorBox}>
					{isEditable ? (
						<RichTextEditor
							ref={rteRef}
							editable={true}
							extensions={extensions}
							content={exampleContent}
							renderControls={() => <EditorMenuControls />}>
							{() => (
								<>
									<LinkBubbleMenu />
									<TableBubbleMenu />
								</>
							)}
						</RichTextEditor>
					) : (
						<RichTextReadOnly content={exampleContent} extensions={extensions} />
					)}
				</Box>
			</Box>
		</Container>
	);
};

export default MuiRichTextEditor;
