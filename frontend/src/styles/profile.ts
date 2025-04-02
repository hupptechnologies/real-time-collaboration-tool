import { SxProps, Theme } from '@mui/material';

export const ProfileContainer: SxProps<Theme> = () => ({
	mt: 5,
	display: 'flex',
	justifyContent: 'center'
});

export const ProfileCard: SxProps<Theme> = () => ({
	p: 4,
	textAlign: 'center',
	boxShadow: 4,
	borderRadius: 4,
	maxWidth: 400,
	width: '100%'
});

export const ProfileAvatar: SxProps<Theme> = (theme) => ({
	width: 100,
	height: 100,
	mx: 'auto',
	mb: 2,
	border: `3px solid ${theme.palette.primary.main}`
});

export const ProfileEditBox: SxProps<Theme> = () => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	gap: 1
});
