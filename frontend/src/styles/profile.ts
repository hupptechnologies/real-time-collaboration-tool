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
	width: '100%',
	background: 'linear-gradient(135deg, #f3f3f3, #e0e0e0)'
});

export const ProfileAvatar: SxProps<Theme> = () => ({
	width: 100,
	height: 100,
	mx: 'auto',
	mb: 2,
	border: '3px solid #1976d2'
});

export const ProfileEditBox: SxProps<Theme> = () => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	gap: 1
});
