import { useState } from 'react';
import {
	Add,
	FiberManualRecord,
	Folder,
	KeyboardArrowDown,
	KeyboardArrowRight,
	MoreHoriz
} from '@mui/icons-material';
import {
	Box,
	Collapse,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	TextField
} from '@mui/material';
import { IFolderListItemProps } from '@/types';
import { AddIconButton, AddIconContentBoxHover, FolderMainBox } from '@/styles';

const FolderListItem: React.FC<IFolderListItemProps> = ({
	folder,
	openFolder,
	editingFolderId,
	menuItem,
	toggleFolder,
	openDocument,
	handleContextMenu,
	onRenameFolder,
	level = 0
}: IFolderListItemProps) => {
	const [isHovered, setIsHovered] = useState(false);

	const isOpen = openFolder[folder.id] || false;
	const handleRename = (value: string) => {
		const trimmedValue = value.trim();
		if (trimmedValue) {
			onRenameFolder(folder.id, trimmedValue);
		}
	};

	return (
		<Box>
			<Box
				sx={FolderMainBox}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}>
				<ListItemButton
					sx={{ pl: level, gridColumn: 1, gridRow: 1 }}
					onClick={() => toggleFolder(folder)}>
					{isOpen ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
					<ListItemIcon sx={{ minWidth: '36px' }}>
						<Folder />
					</ListItemIcon>
					{editingFolderId === folder.id ? (
						<TextField
							autoFocus
							sx={{ width: '120px' }}
							type="text"
							defaultValue={folder.name}
							onBlur={(e) => handleRename(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									handleRename((e.target as HTMLInputElement).value);
								}
							}}
						/>
					) : (
						<ListItemText primary={folder.name} />
					)}
				</ListItemButton>
				{(isHovered || menuItem?.id === folder.id) && (
					<Box sx={AddIconContentBoxHover}>
						<ListItemButton sx={AddIconButton} onClick={(e) => handleContextMenu(e, folder, 'new')}>
							<Add fontSize="small" />
						</ListItemButton>
						<ListItemButton
							sx={AddIconButton}
							onClick={(e) => handleContextMenu(e, folder, 'more')}>
							<MoreHoriz fontSize="small" />
						</ListItemButton>
					</Box>
				)}
			</Box>
			<Collapse in={isOpen} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{folder.folders?.length === 0 && (
						<Box sx={{ pl: level + 1, fontSize: '14px' }} component="span">
							There’s nothing in this folder yet.
						</Box>
					)}
					{folder.documents?.map((doc) => (
						<ListItemButton key={doc.name} sx={{ pl: level + 1 }} onClick={() => openDocument(doc)}>
							<FiberManualRecord sx={{ height: '8px', width: '8px', mr: 1 }} />
							<ListItemText primary={doc.name} />
						</ListItemButton>
					))}
					{folder.folders?.map((subFolder) => (
						<FolderListItem
							key={subFolder.id}
							folder={subFolder}
							editingFolderId={editingFolderId}
							menuItem={menuItem}
							level={level + 1}
							openFolder={openFolder}
							toggleFolder={toggleFolder}
							openDocument={openDocument}
							handleContextMenu={handleContextMenu}
							onRenameFolder={onRenameFolder}
						/>
					))}
				</List>
			</Collapse>
		</Box>
	);
};

export default FolderListItem;
