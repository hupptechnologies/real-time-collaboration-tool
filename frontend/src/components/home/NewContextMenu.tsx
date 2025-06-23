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
			anchorPosition={position ? { top: position.mouseY, left: position.mouseX } : undefined}
			PaperProps={{
				elevation: 4,
				sx: { borderRadius: 2, minWidth: 180, p: 0.5 }
			}}>
			{menuItems.map((item, index) =>
				'divider' in item ? (
					<Divider key={`divider-${index}`} sx={{ my: 0.5 }} />
				) : (
					<MenuItem
						key={item.label}
						onClick={item.handleOnclick}
						sx={{ borderRadius: 1, minHeight: 36 }}>
						<ListItemIcon sx={{ minWidth: 32 }}>{item.icon}</ListItemIcon>
						<ListItemText primary={item.label} />
					</MenuItem>
				)
			)}
		</Menu>
	);
};

export default NewContextMenu;
