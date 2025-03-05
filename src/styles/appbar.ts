import { SxProps, Theme } from '@mui/material/styles';

export const appBarStyles: SxProps<Theme> = (theme) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#ffffff',
	color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
});

export const searchWrapperStyles: SxProps<Theme> = (theme) => ({
	position: 'relative',
	border: '1px solid',
	borderRadius: '5px',
	marginRight: theme.spacing(2),
	marginLeft: theme.spacing(2),
	width: '200px',
	maxWidth: '100%',
	[theme.breakpoints.down('sm')]: {
		display: 'none'
	}
});

export const navigationItemText: SxProps<Theme> = (theme) => ({
	mx: 2,
	cursor: 'pointer',
	color: theme.palette.primary.main,
	'&:hover': { color: theme.palette.secondary.main }
});
