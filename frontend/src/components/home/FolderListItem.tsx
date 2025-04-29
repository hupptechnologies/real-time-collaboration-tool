import {
	Add,
	FiberManualRecord,
	Folder,
	KeyboardArrowDown,
	KeyboardArrowRight
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
	toggleFolder,
	openDocument,
	handleContextMenu,
	level = 0
}: IFolderListItemProps) => {
	const isOpen = openFolder[folder.name] || false;
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
					<ListItemText primary={folder.name} />
				</ListItemButton>
				<Box sx={AddIconContentBox}>
					<Button sx={AddIconButton} onClick={handleContextMenu}>
						<Add />
					</Button>
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
							key={subFolder.name}
							folder={subFolder}
							toggleFolder={toggleFolder}
							openFolder={openFolder}
							openDocument={openDocument}
							level={level + 1}
							handleContextMenu={handleContextMenu}
						/>
					))}
				</List>
			</Collapse>
		</Box>
	);
};

export default FolderListItem;
