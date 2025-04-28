import { SxProps, Theme } from '@mui/material/styles';

export const SpaceCard: SxProps<Theme> = () => ({
	borderRadius: '12px',
	boxShadow: 3,
	transition: '0.3s',
	'&:hover': { boxShadow: 6 },
	width: '100%',
	maxWidth: 360
});

export const FormButtonBox: SxProps<Theme> = () => ({
	display: 'flex',
	justifyContent: 'center',
	margin: '30px 0 0 0'
});

export const ContentGrid: SxProps<Theme> = () => ({
	display: 'grid',
	gridColumn: 1,
	gridRow: 1
});

export const ContentButton: SxProps<Theme> = () => ({
	height: '36px',
	cursor: 'pointer',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-start',
	gridColumn: 1,
	gridRow: 1
});

export const ContentIconBox: SxProps<Theme> = () => ({
	width: '24px',
	height: '24px',
	border: '1px solid #091e4224',
	borderRadius: '4px',
	display: 'block'
});

export const ContentIconInlineBox: SxProps<Theme> = () => ({
	display: 'inline-block',
	boxSizing: 'border-box',
	flexShrink: 0
});

export const AddIconContentBox: SxProps<Theme> = () => ({
	display: 'flex',
	gridColumn: 1,
	gridRow: 1,
	justifyContent: 'flex-end',
	justifySelf: 'end'
});

export const AddIconButton: SxProps<Theme> = () => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	minHeight: '24px',
	minWidth: '24px',
	width: '24px'
});
