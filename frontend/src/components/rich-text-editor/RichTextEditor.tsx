'use client';
import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import { Box } from '@mui/material';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import MenuBar from './MenuBar';
import { IRichTextEditorProps } from '@/types';
import { EditorMainBox } from '@/styles';

const RichTextEditor: React.FC<IRichTextEditorProps> = ({ content, onChange }) => {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Color,
			Underline,
			TextStyle,
			TextAlign.configure({
				types: ['heading', 'paragraph']
			})
		],
		content: content,
		editorProps: {
			attributes: {
				class: 'custom-editor'
			}
		},
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		}
	});

	return (
		<Box sx={EditorMainBox}>
			<MenuBar editor={editor} />
			<EditorContent editor={editor} />
		</Box>
	);
};

export default RichTextEditor;
