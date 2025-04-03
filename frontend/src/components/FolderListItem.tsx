import { Description, ExpandLess, ExpandMore, Folder } from '@mui/icons-material';
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { FolderListItemProps } from '@/types';

const FolderListItem: React.FC<FolderListItemProps> = ({
	folder,
	openFolder,
	toggleFolder,
	openDocument,
	level = 0
}: FolderListItemProps) => {
	const isOpen = openFolder[folder.name] || false;
	return (
		<Box>
			<ListItemButton sx={{ pl: level }} onClick={() => toggleFolder(folder)}>
				<ListItemIcon>
					<Folder />
				</ListItemIcon>
				<ListItemText primary={folder.name} />
				{isOpen ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<Collapse in={isOpen} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{folder.documents?.map((doc, docIndex) => (
						<ListItemButton key={docIndex} sx={{ pl: level + 1 }} onClick={() => openDocument(doc)}>
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
		</Box>
	);
};

export default FolderListItem;
