import { SxProps, Theme } from '@mui/material';

export const ArrowIconStyle = (open: boolean) => ({
	position: 'fixed',
	top: '10%',
	left: open ? 286 : 20,
	transform: 'translateY(-50%)',
	zIndex: 1200,
	transition: '0.3s all ease-in-out',
	border: '1px solid #ddd',
	boxShadow: 1,
	width: 32,
	height: 32,
	borderRadius: '50%',
	backgroundColor: 'background.paper',
	':hover': {
		backgroundColor: 'primary.main',
		'& svg': {
			color: 'white'
		}
	}
});

export const DrawerMenuStyle = (open: boolean): SxProps<Theme> => ({
	width: open ? 300 : 15,
	flexShrink: 0,
	zIndex: 1000,
	transition: '0.3s all ease-in-out',
	'& .MuiDrawer-paper': {
		padding: 2,
		boxSizing: 'border-box',
		width: open ? 300 : 15,
		overflowX: 'hidden',
		transition: '0.3s all ease-in-out'
	}
});

export const SpaceNameBox: SxProps<Theme> = () => ({
	cursor: 'pointer',
	display: 'flex',
	alignItems: 'center',
	gap: 1,
	paddingBottom: 2
});
