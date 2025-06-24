import { SxProps, Theme } from '@mui/material/styles';

export const appBarStyles: SxProps<Theme> = (theme) => ({
	backgroundColor: theme.palette.background.default,
	color: theme.palette.text.primary,
	boxShadow: theme.shadows[2],
	borderBottom: `1px solid ${theme.palette.divider}`
});

export const searchWrapperStyles: SxProps<Theme> = (theme) => ({
	position: 'relative',
	border: `1px solid ${theme.palette.divider}`,
	borderRadius: theme.shape.borderRadius,
	marginRight: theme.spacing(2),
	marginLeft: theme.spacing(2),
	width: '200px',
	maxWidth: '100%',
	backgroundColor: theme.palette.background.paper,
	[theme.breakpoints.down('sm')]: {
		display: 'none'
	}
});

export const navigationItemText: SxProps<Theme> = (theme) => ({
	display: 'flex',
	alignItems: 'center',
	mx: 2,
	cursor: 'pointer',
	color: theme.palette.text.primary,
	transition: 'color 0.2s',
	'&:hover, &:focus': {
		color: theme.palette.primary.main
	},
	fontWeight: 500,
	fontSize: '1rem',
	[theme.breakpoints.down('sm')]: {
		fontSize: '0.95rem'
	}
});

export const iconButtonStyles: SxProps<Theme> = (theme) => ({
	color: theme.palette.text.primary,
	[theme.breakpoints.down('sm')]: {
		padding: theme.spacing(1)
	}
});

export const avatarStyles: SxProps<Theme> = (theme) => ({
	width: 32,
	height: 32,
	[theme.breakpoints.down('sm')]: {
		width: 28,
		height: 28
	}
});
