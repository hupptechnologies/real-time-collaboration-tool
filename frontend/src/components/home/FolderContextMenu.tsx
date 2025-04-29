import React from 'react';
import { Folder, PostAdd } from '@mui/icons-material';
import { Menu, MenuItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { IFolderContextMenuProps } from '@/types';

const FolderContextMenu: React.FC<IFolderContextMenuProps> = ({ open, position, onClose }) => {
	return (
		<Menu
			open={open}
			onClose={onClose}
			anchorReference="anchorPosition"
			anchorPosition={position ? { top: position.mouseY, left: position.mouseX } : undefined}>
			<MenuItem>
				<ListItemIcon>
					<PostAdd fontSize="small" />
				</ListItemIcon>
				<ListItemText primary="Document" />
			</MenuItem>
			<Divider />
			<MenuItem>
				<ListItemIcon>
					<Folder fontSize="small" />
				</ListItemIcon>
				<ListItemText primary="Folder" />
			</MenuItem>
		</Menu>
	);
};

export default FolderContextMenu;
