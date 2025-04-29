import {
	Add,
	FiberManualRecord,
	Folder,
	KeyboardArrowDown,
	KeyboardArrowRight
	// MoreHoriz
} from '@mui/icons-material';
import {
	Box,
	Button,
	Collapse,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText
} from '@mui/material';
import { IFolderListItemProps } from '@/types';
import { AddIconButton, AddIconContentBox, FolderMainBox } from '@/styles';

const FolderListItem: React.FC<IFolderListItemProps> = ({
	folder,
	openFolder,
	editingFolderId,
	toggleFolder,
	openDocument,
	handleContextMenu,
	setEditingFolderId,
	onRenameFolder,
	level = 0
}: IFolderListItemProps) => {
	const isOpen = openFolder[folder.id] || false;
	return (
		<Box>
			<Box sx={FolderMainBox}>
				<ListItemButton
					sx={{ pl: level, gridColumn: 1, gridRow: 1 }}
					onClick={() => toggleFolder(folder)}>
					{isOpen ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
					<ListItemIcon sx={{ minWidth: '36px' }}>
						<Folder />
					</ListItemIcon>
					{editingFolderId === folder.id ? (
						<input
							autoFocus
							type="text"
							defaultValue={folder.name}
							onBlur={(e) => {
								onRenameFolder(folder.id, e.target.value.trim());
								setEditingFolderId(null);
							}}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									onRenameFolder(folder.id, (e.target as HTMLInputElement).value.trim());
									setEditingFolderId(null);
								}
							}}
						/>
					) : (
						<ListItemText primary={folder.name} />
					)}
				</ListItemButton>
				<Box sx={AddIconContentBox}>
					<Button sx={AddIconButton} onClick={(e) => handleContextMenu(e, folder)}>
						<Add fontSize="small" />
					</Button>
					{/* <Button sx={AddIconButton} onClick={(e) => handleContextMenu(e, folder)}>
						<MoreHoriz fontSize="small" />
					</Button> */}
				</Box>
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
							level={level + 1}
							openFolder={openFolder}
							toggleFolder={toggleFolder}
							openDocument={openDocument}
							handleContextMenu={handleContextMenu}
							setEditingFolderId={setEditingFolderId}
							onRenameFolder={onRenameFolder}
						/>
					))}
				</List>
			</Collapse>
		</Box>
	);
};

export default FolderListItem;
