import { useState } from 'react';
import {
	Box,
	Collapse,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Tooltip
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
	level,
	menuItem,
	handleContextMenu
}: IPageListItemProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	const handleOpenPage = () => {
		setIsOpen(!isOpen);
		openPage(page);
	};

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
					<Tooltip title={page.title.length > 8 ? page.title : ''} placement="top">
						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							<ListItemText
								primary={page.title}
								sx={ListItemTextStyle(isHovered, menuItem?.id === page.id)}
							/>
							{page.status === 'draft' && (
								<Box component="span" sx={DraftStatusBox}>
									{page.status}
								</Box>
							)}
						</Box>
					</Tooltip>
				</ListItemButton>
				{(isHovered || menuItem?.id === page?.id) && (
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
								level={level ? level + 2 : 0}
								menuItem={menuItem}
								handleContextMenu={handleContextMenu}
							/>
						))}
				</List>
			</Collapse>
		</Box>
	);
};

export default PageListItem;
