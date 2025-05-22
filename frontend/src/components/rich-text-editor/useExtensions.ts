import type { EditorOptions } from '@tiptap/core';
import { useMemo } from 'react';
import StarterKit from '@tiptap/starter-kit';
import { TextAlign } from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import { Link } from '@tiptap/extension-link';
import { Color } from '@tiptap/extension-color';
import { LinkBubbleMenuHandler } from 'mui-tiptap';
import { TUseExtensionsOptions } from '@/types';

const CustomLinkExtension = Link.extend({
	inclusive: false
});

const useExtensions = ({ placeholder }: TUseExtensionsOptions): EditorOptions['extensions'] => {
	return useMemo(() => {
		return [
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
	}, [placeholder]);
};
export default useExtensions;
