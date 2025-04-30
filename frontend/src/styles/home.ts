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
	paddingLeft: 0,
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
	// border: '1px solid #091e4224',
	borderRadius: '4px',
	display: 'block'
});

export const ContentIconInlineBox: SxProps<Theme> = () => ({
	display: 'inline-block',
	boxSizing: 'border-box',
	flexShrink: 0
});

export const FolderMainBox: SxProps<Theme> = () => ({
	display: 'grid',
	gridColumn: 1,
	gridRow: 1,
	position: 'relative'
});

export const AddIconContentBox: SxProps<Theme> = () => ({
	display: 'flex',
	gridColumn: 1,
	gridRow: 1,
	justifyContent: 'flex-end',
	justifySelf: 'end'
});

export const AddIconContentBoxHover: SxProps<Theme> = () => ({
	...AddIconContentBox,
	position: 'absolute',
	right: 10,
	top: '50%',
	display: 'flex',
	gap: '4px',
	transform: 'translateY(-50%)'
});

export const AddIconButton: SxProps<Theme> = (theme) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	minHeight: '24px',
	minWidth: '24px',
	width: '24px',
	':hover': {
		backgroundColor: theme.palette.mode === 'dark' ? '#ffffff14' : '#0000000a',
		textDecoration: 'none'
	}
});

export const createBtn: SxProps<Theme> = () => ({
	paddingLeft: 0,
	cursor: 'pointer',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-start',
	width: '100%'
});
