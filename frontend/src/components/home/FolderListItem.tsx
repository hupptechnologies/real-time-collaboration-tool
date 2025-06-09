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
	TextField,
	Tooltip
} from '@mui/material';
import { IFolder, IFolderListItemProps } from '@/types';
import {
	AddIconButton,
	AddIconContentBoxHover,
	EditFolderListItemText,
	FolderListItemText,
	FolderMainBox
} from '@/styles';

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
							variant="outlined"
							size="small"
							sx={EditFolderListItemText}
							inputProps={{
								maxLength: 50
							}}
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
						<Tooltip title={folder.name.length > 10 ? folder.name : ''} placement="top">
							<ListItemText
								primary={folder.name}
								sx={FolderListItemText(isHovered, menuItem as IFolder, folder)}
							/>
						</Tooltip>
					)}
				</ListItemButton>
				{(isHovered || menuItem?.id === folder.id) && editingFolderId !== folder.id && (
					<Box sx={AddIconContentBoxHover}>
						<Tooltip title="Create" placement="top">
							<ListItemButton
								sx={AddIconButton}
								onClick={(e) => handleContextMenu(e, folder, 'new')}>
								<Add fontSize="small" />
							</ListItemButton>
						</Tooltip>
						<Tooltip title="More actions" placement="top">
							<ListItemButton
								sx={AddIconButton}
								onClick={(e) => handleContextMenu(e, folder, 'more')}>
								<MoreHoriz fontSize="small" />
							</ListItemButton>
						</Tooltip>
					</Box>
				)}
			</Box>
			<Collapse in={isOpen} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{folder.folders?.length === 0 && (
						<Box sx={{ pl: level + 3, fontSize: '14px' }} component="span">
							There&apos;s nothing in this folder yet.
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
