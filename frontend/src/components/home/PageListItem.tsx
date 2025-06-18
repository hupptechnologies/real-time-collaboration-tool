import { useState, useEffect } from 'react';
import {
	Box,
	Collapse,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Tooltip,
	TextField
} from '@mui/material';
import {
	ArticleOutlined,
	FiberManualRecord,
	KeyboardArrowDown,
	KeyboardArrowRight
} from '@mui/icons-material';
import ListItemActionButtons from './ListItemActionButtons';
import { IPageListItemProps } from '@/types';
import { DraftStatusBox, FolderMainBox, ListItemTextStyle } from '@/styles';

const PageListItem = ({
	page,
	openPage,
	level = 0,
	menuItem,
	handleContextMenu,
	editingPageId,
	onRenamePage,
	openPages = {},
	selectedPageId = null
}: IPageListItemProps) => {
	const [isHovered, setIsHovered] = useState(false);
	const [newTitle, setNewTitle] = useState(page.title);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (page.id && openPages[page.id]) {
			setIsOpen(true);
		} else {
			setIsOpen(false);
		}
	}, [openPages, page.id]);

	const handleOpenPage = () => {
		setIsOpen(!isOpen);
		openPage(page);
	};

	const handleRename = (value: string) => {
		const trimmedValue = value.trim();
		if (trimmedValue && page.id) {
			onRenamePage?.(page.id, trimmedValue);
		}
	};

	const isEditing = editingPageId === page.id;

	return (
		<Box>
			<Box
				sx={FolderMainBox}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}>
				<ListItemButton
					key={page.id}
					sx={{ gridColumn: 1, gridRow: 1, padding: '0 4px 0 0', pl: level }}
					onClick={handleOpenPage}>
					{page.pages && page.pages.length > 0 ? (
						isOpen ? (
							<KeyboardArrowDown />
						) : (
							<KeyboardArrowRight />
						)
					) : (
						<FiberManualRecord sx={{ height: '8px', width: '8px', mr: 1 }} />
					)}
					<ListItemIcon sx={{ minWidth: '36px' }}>
						<ArticleOutlined />
					</ListItemIcon>
					{isEditing ? (
						<TextField
							size="small"
							value={newTitle}
							onChange={(e) => setNewTitle(e.target.value)}
							onBlur={() => handleRename(newTitle)}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									handleRename(newTitle);
								}
							}}
							autoFocus
							fullWidth
							variant="outlined"
							sx={{ mr: 1 }}
						/>
					) : (
						<Tooltip title={page.title.length > 8 ? page.title : ''} placement="top">
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<ListItemText
									primary={page.title || 'Untitled'}
									sx={ListItemTextStyle(isHovered, menuItem?.id === page.id)}
								/>
								{page.status === 'draft' && (
									<Box component="span" sx={DraftStatusBox}>
										{page.status}
									</Box>
								)}
							</Box>
						</Tooltip>
					)}
				</ListItemButton>
				{(isHovered || menuItem?.id === page?.id) && !isEditing && (
					<ListItemActionButtons
						option={page}
						menuItem={menuItem}
						handleContextMenu={handleContextMenu}
					/>
				)}
			</Box>

			<Collapse in={isOpen} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{page.pages &&
						page.pages.length > 0 &&
						page.pages.map((subPage) => (
							<PageListItem
								key={subPage.id}
								page={subPage}
								openPage={openPage}
								level={level + 2}
								menuItem={menuItem}
								handleContextMenu={handleContextMenu}
								editingPageId={editingPageId}
								onRenamePage={onRenamePage}
								openPages={openPages}
								selectedPageId={selectedPageId}
							/>
						))}
				</List>
			</Collapse>
		</Box>
	);
};

export default PageListItem;
