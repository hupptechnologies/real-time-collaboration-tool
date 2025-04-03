import { SxProps, Theme } from '@mui/material';

export const ArrowIconStyle =
	(open: boolean): SxProps<Theme> =>
	(theme) => ({
		position: 'absolute',
		top: 72,
		left: open ? 286 : 20,
		zIndex: 1100,
		transition: '0.3s all ease-in-out',
		border: '1px solid #ddd',
		boxShadow: 1,
		width: 24,
		height: 24,
		borderRadius: '50%',
		':hover': {
			backgroundColor: theme.palette.primary.main
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
