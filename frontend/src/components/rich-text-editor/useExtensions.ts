import { useMemo } from 'react';
import type { EditorOptions } from '@tiptap/core';
import { LinkBubbleMenuHandler } from 'mui-tiptap';
import { Color } from '@tiptap/extension-color';
import { Highlight } from '@tiptap/extension-highlight';
import { Link } from '@tiptap/extension-link';
import { StarterKit } from '@tiptap/starter-kit';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import { TaskList } from '@tiptap/extension-task-list';
import { TaskItem } from '@tiptap/extension-task-item';
import { TextAlign } from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import { Underline } from '@tiptap/extension-underline';
import { TUseExtensionsOptions } from '@/types';

const CustomLinkExtension = Link.extend({
	inclusive: false
});

const CustomSubscript = Subscript.extend({
	excludes: 'superscript'
});

const CustomSuperscript = Superscript.extend({
	excludes: 'subscript'
});

const useExtensions = ({ placeholder }: TUseExtensionsOptions): EditorOptions['extensions'] => {
	return useMemo(() => {
		return [
			StarterKit,
			Color,
			CustomLinkExtension.configure({
				autolink: true,
				linkOnPaste: true,
				openOnClick: false
			}),
			CustomSubscript,
			CustomSuperscript,
			LinkBubbleMenuHandler,
			Highlight.configure({ multicolor: true }),
			TextStyle,
			TaskList,
			TaskItem.configure({
				nested: true
			}),
			TextAlign.configure({
				types: ['heading', 'paragraph'],
				alignments: ['left', 'right', 'center'],
				defaultAlignment: 'left'
			}),
			Underline
		];
	}, [placeholder]);
};
export default useExtensions;
