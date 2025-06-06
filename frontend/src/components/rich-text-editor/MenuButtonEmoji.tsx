import React, { useState } from 'react';
import { IconButton, Tooltip, Popper, ClickAwayListener, useTheme } from '@mui/material';
import { EmojiEmotions } from '@mui/icons-material';
import { Editor } from '@tiptap/core';
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';

interface MenuButtonEmojiProps {
	editor: Editor | null;
}

const MenuButtonEmoji: React.FC<MenuButtonEmojiProps> = ({ editor }) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const theme = useTheme();

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const handleEmojiClick = (emojiData: EmojiClickData) => {
		if (editor) {
			editor.chain().focus().insertContent(emojiData.emoji).run();
		}
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	if (!editor) {
		return null;
	}

	return (
		<>
			<Tooltip title="Insert emoji">
				<IconButton onClick={handleClick} size="small">
					<EmojiEmotions fontSize="small" />
				</IconButton>
			</Tooltip>
			<Popper open={open} anchorEl={anchorEl} placement="bottom-start">
				<ClickAwayListener onClickAway={() => setAnchorEl(null)}>
					<div>
						<EmojiPicker
							theme={theme.palette.mode === 'dark' ? Theme.DARK : Theme.LIGHT}
							onEmojiClick={handleEmojiClick}
							autoFocusSearch={false}
							width={320}
							height={400}
							lazyLoadEmojis={true}
							searchPlaceholder="Search emoji..."
						/>
					</div>
				</ClickAwayListener>
			</Popper>
		</>
	);
};

export default MenuButtonEmoji;
