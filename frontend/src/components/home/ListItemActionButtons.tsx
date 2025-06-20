import { useEffect, useState } from 'react';
import { Add, MoreHoriz } from '@mui/icons-material';
import { Box, ListItemButton, Tooltip } from '@mui/material';
import { AddIconButton, AddIconContentBoxHover } from '@/styles';
import { IListItemActionButtonsProps, IPage, TMenuOption } from '@/types';

const ListItemActionButtons: React.FC<IListItemActionButtonsProps> = ({
	option,
	menuItem,
	handleContextMenu
}: IListItemActionButtonsProps) => {
	const [activeButtonType, setActiveButtonType] = useState<TMenuOption | null>(null);

	const handleButtonClick = (e: React.MouseEvent<HTMLDivElement>, type: TMenuOption) => {
		setActiveButtonType(type);
		handleContextMenu(e, option, type);
	};

	useEffect(() => {
		if (!menuItem) {
			setActiveButtonType(null);
		}
	}, [menuItem]);
	return (
		<Box sx={AddIconContentBoxHover}>
			{(option as IPage)?.status !== 'draft' && (
				<Tooltip title="Create" placement="top">
					<ListItemButton
						sx={AddIconButton}
						disableRipple={true}
						data-type="new"
						data-active={menuItem?.id === option.id && activeButtonType === 'new'}
						onClick={(e) => handleButtonClick(e, 'new')}>
						<Add fontSize="small" />
					</ListItemButton>
				</Tooltip>
			)}
			<Tooltip title="More actions" placement="top">
				<ListItemButton
					sx={AddIconButton}
					disableRipple={true}
					data-type="more"
					data-active={menuItem?.id === option.id && activeButtonType === 'more'}
					onClick={(e) => handleButtonClick(e, 'more')}>
					<MoreHoriz fontSize="small" />
				</ListItemButton>
			</Tooltip>
		</Box>
	);
};

export default ListItemActionButtons;
