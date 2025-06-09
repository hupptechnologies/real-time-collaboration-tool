import { SxProps, Theme } from '@mui/material';

export const SpaceCard: SxProps<Theme> = {
	border: '1px solid',
	borderColor: 'divider',
	boxShadow: 'none',
	borderRadius: 2,
	backgroundColor: '#FFFFFF',
	transition: 'all 0.2s ease-in-out',
	'&:hover': {
		transform: 'translateY(-2px)',
		boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
		borderColor: (theme) => theme.palette.primary.main,
		'& .space-actions': {
			opacity: 1
		}
	}
};

export const SpaceAvatar: SxProps<Theme> = {
	backgroundColor: '#DEEBFF',
	color: '#0052CC',
	width: 48,
	height: 48,
	borderRadius: 2,
	'& svg': {
		fontSize: '24px'
	}
};

export const SpaceTitle: SxProps<Theme> = {
	fontWeight: 600,
	fontSize: '1rem',
	mb: 0.5,
	color: '#172B4D',
	'&:hover': {
		color: '#0052CC'
	}
};

export const SpaceDescription: SxProps<Theme> = {
	color: '#5E6C84',
	display: '-webkit-box',
	WebkitLineClamp: 2,
	WebkitBoxOrient: 'vertical',
	overflow: 'hidden',
	fontSize: '0.875rem',
	lineHeight: 1.5
};

export const SpaceActionsContainer: SxProps<Theme> = {
	display: 'flex',
	justifyContent: 'flex-end',
	gap: 1,
	opacity: 0,
	transition: 'opacity 0.15s ease-in-out',
	mt: 1
};

export const SpaceActionButton: SxProps<Theme> = {
	color: '#5E6C84',
	padding: '4px'
};

export const SpaceEditButton: SxProps<Theme> = {
	...SpaceActionButton,
	'&:hover': {
		color: '#0052CC',
		backgroundColor: '#DEEBFF'
	}
};

export const SpaceDeleteButton: SxProps<Theme> = {
	...SpaceActionButton,
	'&:hover': {
		color: '#DE350B',
		backgroundColor: '#FFEBE6'
	}
};

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
