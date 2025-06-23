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

export const EmptyStateContainer: SxProps<Theme> = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	padding: 3,
	height: '50vh',
	color: 'text.secondary'
};

export const EmptyStateIcon: SxProps<Theme> = {
	width: '140px',
	height: '140px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	mb: 3,
	'& svg': {
		fontSize: '140px',
		color: (theme) => theme.palette.grey[200],
		opacity: 1
	}
};

export const EmptyStateTitle: SxProps<Theme> = {
	mb: 1,
	fontWeight: 500,
	color: 'text.primary'
};

export const EmptyStateDescription: SxProps<Theme> = {
	mb: 3,
	textAlign: 'center',
	maxWidth: '280px'
};

export const DraftStatusChip: SxProps<Theme> = {
	ml: 1,
	fontWeight: 600,
	textTransform: 'capitalize'
};
