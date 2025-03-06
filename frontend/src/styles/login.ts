import { SxProps, Theme } from '@mui/material';

export const MainStackStyle: SxProps<Theme> = (theme) => ({
	justifyContent: 'center',
	height: 'calc((1 - var(--template-frame-height, 0)) * 100%)',
	marginTop: 'max(40px - var(--template-frame-height, 0px), 0px)',
	minHeight: '100%',
	'&::before': {
		content: '""',
		display: 'block',
		position: 'absolute',
		zIndex: -1,
		inset: 0,
		backgroundImage: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
		backgroundRepeat: 'no-repeat',
		...theme.applyStyles('dark', {
			backgroundImage: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))'
		})
	}
});

export const StackStyle: SxProps<Theme> = () => ({
	justifyContent: 'center',
	gap: { xs: 6, sm: 12 },
	p: 2,
	mx: 'auto'
});

export const StackNextStyle: SxProps<Theme> = () => ({
	justifyContent: 'center',
	gap: { xs: 6, sm: 12 },
	p: { xs: 2, sm: 4 },
	m: 'auto'
});

export const cardStyles: SxProps<Theme> = (theme) => ({
	display: 'flex',
	flexDirection: 'column',
	alignSelf: 'center',
	width: '100%',
	padding: theme.spacing(4),
	gap: theme.spacing(2),
	boxShadow:
		'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
	[theme.breakpoints.up('sm')]: {
		width: '450px'
	},
	...(theme.palette.mode === 'dark' && {
		boxShadow:
			'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px'
	})
});

export const emailBoxStyles: SxProps<Theme> = () => ({
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
	gap: 2
});
