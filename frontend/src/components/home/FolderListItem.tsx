import { useState, MouseEvent } from 'react';
import {
	FiberManualRecord,
	Folder,
	KeyboardArrowDown,
	KeyboardArrowRight
} from '@mui/icons-material';
import {
	Box,
	Collapse,
	Divider,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem
} from '@mui/material';
import { FolderListItemProps, IDocument, IFolder } from '@/types';

const FolderListItem: React.FC<FolderListItemProps> = ({
	folder,
	openFolder,
	toggleFolder,
	openDocument,
	level = 0
}: FolderListItemProps) => {
	const [contextMenu, setContextMenu] = useState<
		| {
				mouseX: number;
				mouseY: number;
				target: 'folder' | 'document';
				item: IFolder | IDocument;
		  }
		| undefined
	>(undefined);

	const isOpen = openFolder[folder.name] || false;
	const handleContextMenu = (
		event: MouseEvent,
		item: IFolder | IDocument,
		target: 'folder' | 'document'
	) => {
		event.preventDefault();
		setContextMenu({ mouseX: event.clientX - 2, mouseY: event.clientY - 4, target, item });
	};

	const handleClose = () => setContextMenu(undefined);

	const renderMenu = () => {
		if (!contextMenu) {
			return null;
		}

		if (contextMenu.target === 'folder') {
			return (
				<Box>
					<MenuItem>New Folder</MenuItem>
					<MenuItem>New Document</MenuItem>
					<Divider />
					<MenuItem>Rename Folder</MenuItem>
				</Box>
			);
		}
		return <MenuItem>Rename Document</MenuItem>;
	};

	return (
		<Box>
			<ListItemButton
				sx={{ pl: level }}
				onClick={() => toggleFolder(folder)}
				onContextMenu={(e) => handleContextMenu(e, folder, 'folder')}>
				{isOpen ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
				<ListItemIcon>
					<Folder />
				</ListItemIcon>
				<ListItemText primary={folder.name} />
			</ListItemButton>
			<Collapse in={isOpen} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{folder.folders?.length === 0 && (
						<Box sx={{ pl: level + 1 }} component="span">
							There’s nothing in this folder yet.
						</Box>
					)}
					{folder.documents?.map((doc) => (
						<ListItemButton
							key={doc.name}
							sx={{ pl: level + 1 }}
							onClick={() => openDocument(doc)}
							onContextMenu={(e) => handleContextMenu(e, doc, 'document')}>
							<FiberManualRecord sx={{ height: '8px', width: '8px', mr: 1 }} />
							<ListItemText primary={doc.name} />
						</ListItemButton>
					))}
					{folder.folders?.map((subFolder) => (
						<FolderListItem
							key={subFolder.name}
							folder={subFolder}
							toggleFolder={toggleFolder}
							openFolder={openFolder}
							openDocument={openDocument}
							level={level + 1}
						/>
					))}
				</List>
			</Collapse>
			<Menu
				open={Boolean(contextMenu)}
				onClose={handleClose}
				anchorReference="anchorPosition"
				anchorPosition={
					contextMenu ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined
				}>
				{renderMenu()}
			</Menu>
		</Box>
	);
};

export default FolderListItem;
