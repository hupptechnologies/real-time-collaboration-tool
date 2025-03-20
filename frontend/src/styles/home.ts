import { SxProps, Theme } from '@mui/material/styles';

export const SpaceCard: SxProps<Theme> = () => ({
	borderRadius: '12px',
	boxShadow: 3,
	transition: '0.3s',
	'&:hover': { boxShadow: 6 },
	width: '100%',
	maxWidth: 360
});
