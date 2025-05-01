'use client';
import { EditorContent, useEditor } from '@tiptap/react';
import { Box } from '@mui/material';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';
import MenuBar from './MenuBar';
import { IRichTextEditorProps } from '@/types';

const RichTextEditor: React.FC<IRichTextEditorProps> = ({ content, onChange }) => {
	const editor = useEditor({
		extensions: [StarterKit],
		content: content,
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		}
	});

	return (
		<Box>
			<MenuBar editor={editor} />
			<EditorContent editor={editor} className="custom-editor" />
		</Box>
	);
};

export default RichTextEditor;
