import { SxProps, Theme } from '@mui/material';

export const DialogModalTitleStyle: SxProps<Theme> = () => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between'
});

export const MenuIconButtonStyle: SxProps<Theme> = (theme) => ({
	position: 'fixed',
	top: 10,
	left: 12,
	zIndex: 1200,
	backgroundColor: theme.palette.background.paper,
	boxShadow: theme.shadows[2],
	'&:hover': {
		backgroundColor: 'primary.main',
		'& svg': {
			color: 'white'
		}
	}
});
