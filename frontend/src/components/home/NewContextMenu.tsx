import React from 'react';
import { Menu, MenuItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { IFolderContextMenuProps } from '@/types';

const NewContextMenu: React.FC<IFolderContextMenuProps> = ({
	open,
	position,
	menuItems,
	handleOnclose
}) => {
	return (
		<Menu
			open={open}
			onClose={handleOnclose}
			anchorReference="anchorPosition"
			anchorPosition={position ? { top: position.mouseY, left: position.mouseX } : undefined}>
			{menuItems.map((item, index) =>
				'divider' in item ? (
					<Divider key={`divider-${index}`} />
				) : (
					<MenuItem key={item.label} onClick={item.handleOnclick}>
						<ListItemIcon>{item.icon}</ListItemIcon>
						<ListItemText primary={item.label} />
					</MenuItem>
				)
			)}
		</Menu>
	);
};

export default NewContextMenu;
