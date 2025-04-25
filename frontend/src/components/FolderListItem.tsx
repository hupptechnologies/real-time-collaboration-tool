import { useState, MouseEvent } from 'react';
import { Description, ExpandLess, ExpandMore, Folder } from '@mui/icons-material';
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
	const [contextMenu, setContextMenu] = useState<{
		mouseX: number;
		mouseY: number;
		target: 'folder' | 'document';
		item: IFolder | IDocument;
	} | null>(null);

	const isOpen = openFolder[folder.name] || false;

	const handleContextMenu = (
		event: MouseEvent,
		item: IFolder | IDocument,
		target: 'folder' | 'document'
	) => {
		event.preventDefault();
		setContextMenu({ mouseX: event.clientX - 2, mouseY: event.clientY - 4, target, item });
	};

	const handleClose = () => {
		setContextMenu(null);
	};

	return (
		<Box>
			<ListItemButton
				sx={{ pl: level }}
				onClick={() => toggleFolder(folder)}
				onContextMenu={(e) => handleContextMenu(e, folder, 'folder')}>
				<ListItemIcon>
					<Folder />
				</ListItemIcon>
				<ListItemText primary={folder.name} />
				{(Array.isArray(folder.folders) && folder.folders.length > 0) ||
				(Array.isArray(folder.documents) && folder.documents.length > 0) ? (
					isOpen ? (
						<ExpandLess />
					) : (
						<ExpandMore />
					)
				) : null}
			</ListItemButton>
			<Collapse in={isOpen} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{folder.documents?.map((doc, docIndex) => (
						<ListItemButton
							key={docIndex}
							sx={{ pl: level + 1 }}
							onClick={() => openDocument(doc)}
							onContextMenu={(e) => handleContextMenu(e, doc, 'document')}>
							<Description sx={{ mr: 1 }} />
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
				{contextMenu?.target === 'folder' ? (
					<Box>
						<MenuItem>New Folder</MenuItem>
						<MenuItem>New Document</MenuItem>
						<Divider />
						<MenuItem>Rename Folder</MenuItem>
					</Box>
				) : (
					<MenuItem>Rename Document</MenuItem>
				)}
			</Menu>
		</Box>
	);
};

export default FolderListItem;
