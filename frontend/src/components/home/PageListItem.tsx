import { useState, useEffect } from 'react';
import Link from 'next/link';
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
import {
	DraftStatusBox,
	EditItemText,
	ListItemTextStyle,
	MainBoxContent,
	PageMainBox
} from '@/styles';

const PageListItem = ({
	page,
	level = 0,
	menuItem,
	handleContextMenu,
	editingPageId,
	handleRename,
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

	const isEditing = editingPageId === page.id;
	const isSelected = selectedPageId === page.id;
	const isMenuOpen = menuItem?.id === page.id;
	return (
		<>
			<Box sx={{ pl: level }}>
				<Box
					sx={PageMainBox(isSelected, isEditing)}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}>
					<Box sx={MainBoxContent}>
						<Box sx={{ display: 'flex', alignItems: 'center' }} onClick={() => setIsOpen(!isOpen)}>
							{page.pages && page.pages.length > 0 ? (
								isOpen ? (
									<KeyboardArrowDown />
								) : (
									<KeyboardArrowRight />
								)
							) : (
								<FiberManualRecord sx={{ height: '8px', width: '8px', ml: 1, mr: 1 }} />
							)}
						</Box>
						<ListItemButton
							key={page.id}
							component={Link}
							disableRipple={true}
							href={`/home/${page.spaceId}?pageId=${page.id}&edit=${page.status === 'draft'}`}
							sx={{ padding: '0 4px 0 0', '&:hover': { background: 'transparent' } }}>
							<ListItemIcon sx={{ minWidth: '30px', color: isSelected ? '#1868DB' : 'inherit' }}>
								<ArticleOutlined sx={{ height: '24px', width: '24px' }} />
							</ListItemIcon>
							{isEditing ? (
								<TextField
									sx={EditItemText}
									size="small"
									value={newTitle}
									onChange={(e) => setNewTitle(e.target.value)}
									onBlur={() => handleRename(page, newTitle, 'page')}
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											handleRename(page, newTitle, 'page');
										}
									}}
									autoFocus
									fullWidth
									variant="outlined"
								/>
							) : (
								<Tooltip title={page.title.length > 8 ? page.title : ''} placement="right-end">
									<Box sx={{ display: 'flex', alignItems: 'center' }}>
										<ListItemText
											primary={page.title || 'Untitled'}
											sx={ListItemTextStyle(isHovered, isSelected)}
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
					</Box>
					{(isHovered || isMenuOpen) && !isEditing && (
						<ListItemActionButtons
							option={page}
							menuItem={menuItem}
							handleContextMenu={handleContextMenu}
						/>
					)}
				</Box>
			</Box>

			<Collapse in={isOpen} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{page.pages &&
						page.pages.length > 0 &&
						page.pages.map((subPage) => (
							<PageListItem
								key={subPage.id}
								page={subPage}
								level={level + 1}
								menuItem={menuItem}
								handleContextMenu={handleContextMenu}
								editingPageId={editingPageId}
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

export default PageListItem;
