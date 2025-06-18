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
import { IFolder, IFolderListItemProps, IPage } from '@/types';
import { EditFolderListItemText, FolderMainBox, ListItemTextStyle } from '@/styles';
import PageListItem from './PageListItem';
import ListItemActionButtons from './ListItemActionButtons';

const FolderListItem: React.FC<IFolderListItemProps> = ({
	folder,
	openFolder,
	editingFolderId,
	menuItem,
	toggleFolder,
	openPage,
	handleContextMenu,
	onRenameFolder,
	level = 0,
	editingPageId,
	onRenamePage,
	openPages = {},
	selectedPageId = null
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
					sx={{ gridColumn: 1, gridRow: 1, padding: '0 4px 0 0', pl: level }}
					onClick={() => toggleFolder(folder)}>
					{isOpen ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
					<ListItemIcon sx={{ minWidth: '36px' }}>
						{isOpen ? <FolderOpen /> : <FolderOutlined />}
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
								sx={ListItemTextStyle(isHovered, menuItem?.id === folder.id)}
							/>
						</Tooltip>
					)}
				</ListItemButton>
				{(isHovered || menuItem?.id === folder.id) && editingFolderId !== folder.id && (
					<ListItemActionButtons
						option={folder}
						menuItem={menuItem as IFolder}
						handleContextMenu={(e, option, type) => handleContextMenu(e, option as IFolder, type)}
					/>
				)}
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
							openPage={openPage}
							level={level + 2}
							menuItem={menuItem as IPage}
							handleContextMenu={handleContextMenu}
							editingPageId={editingPageId}
							onRenamePage={onRenamePage}
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
							openPage={openPage}
							handleContextMenu={handleContextMenu}
							onRenameFolder={onRenameFolder}
							openPages={openPages}
							selectedPageId={selectedPageId}
						/>
					))}
				</List>
			</Collapse>
		</Box>
	);
};

export default FolderListItem;
