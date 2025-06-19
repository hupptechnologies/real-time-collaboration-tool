import { useState } from 'react';
import {
	FolderOpen,
	FolderOutlined,
	KeyboardArrowDown,
	KeyboardArrowRight
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
import PageListItem from './PageListItem';
import ListItemActionButtons from './ListItemActionButtons';
import { IFolder, IFolderListItemProps, IPage } from '@/types';
import { EditItemText, FolderMainBox, ListItemTextStyle, MainBoxContent } from '@/styles';

const FolderListItem: React.FC<IFolderListItemProps> = ({
	folder,
	openFolder,
	editingFolderId,
	menuItem,
	toggleFolder,
	handleContextMenu,
	handleRename,
	level = 0,
	editingPageId,
	openPages = {},
	selectedPageId = null
}: IFolderListItemProps) => {
	const [isHovered, setIsHovered] = useState(false);
	const isOpen = openFolder[folder.id] || false;
	const isEditing = editingFolderId === folder.id;
	const isMenuOpen = menuItem?.id === folder.id;

	return (
		<>
			<Box sx={{ pl: level }}>
				<Box
					sx={FolderMainBox(isEditing)}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}>
					<Box sx={MainBoxContent}>
						<Box
							sx={{ display: 'flex', alignItems: 'center' }}
							onClick={() => toggleFolder(folder)}>
							{isOpen ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
						</Box>
						<ListItemButton
							disableRipple={true}
							sx={{ padding: '0 4px 0 0' }}
							onClick={() => toggleFolder(folder)}>
							<ListItemIcon sx={{ minWidth: '36px' }}>
								{isOpen ? <FolderOpen /> : <FolderOutlined />}
							</ListItemIcon>
							{isEditing ? (
								<TextField
									autoFocus
									variant="outlined"
									size="small"
									sx={EditItemText}
									type="text"
									defaultValue={folder.name}
									onBlur={(e) => handleRename(folder, e.target.value, 'folder')}
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											handleRename(folder, (e.target as HTMLInputElement).value, 'folder');
										}
									}}
								/>
							) : (
								<Tooltip title={folder.name.length > 10 ? folder.name : ''} placement="top">
									<ListItemText
										primary={folder.name}
										sx={ListItemTextStyle(isHovered, menuItem?.id === folder.id)}
									/>
								</Tooltip>
							)}
						</ListItemButton>
					</Box>
					{(isHovered || isMenuOpen) && !isEditing && (
						<ListItemActionButtons
							option={folder}
							menuItem={menuItem as IFolder}
							handleContextMenu={(e, option, type) => handleContextMenu(e, option as IFolder, type)}
						/>
					)}
				</Box>
			</Box>
			<Collapse in={isOpen} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{folder.folders?.length === 0 && folder.pages?.length === 0 && (
						<Box sx={{ pl: level + 3, fontSize: '14px' }} component="span">
							There&apos;s nothing in this folder yet.
						</Box>
					)}
					{folder.pages?.map((page) => (
						<PageListItem
							key={page.id}
							page={page}
							level={level + 2}
							menuItem={menuItem as IPage}
							handleContextMenu={handleContextMenu}
							editingPageId={editingPageId}
							handleRename={handleRename}
							openPages={openPages}
							selectedPageId={selectedPageId}
						/>
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
							handleContextMenu={handleContextMenu}
							handleRename={handleRename}
							openPages={openPages}
							selectedPageId={selectedPageId}
						/>
					))}
				</List>
			</Collapse>
		</>
	);
};

export default FolderListItem;
