import { SxProps, Theme } from '@mui/material';

// Common transition settings
const transitions = {
	duration: '0.3s',
	easing: 'ease-in-out'
};

export const EditorMainBox: SxProps<Theme> = (theme) => ({
	'.custom-editor': {
		minHeight: '156px',
		border: '1px solid #ccc',
		borderRadius: 2,
		backgroundColor: theme.palette.grey[100],
		padding: theme.spacing(2)
	}
});

export const MenuBoxPaper: SxProps<Theme> = (theme) => ({
	display: 'flex',
	border: `1px solid ${theme.palette.divider}`,
	flexWrap: 'wrap',
	borderRadius: 2,
	mb: 1
});

export const AlignmentBox: SxProps<Theme> = () => ({
	display: 'flex',
	alignItems: 'center',
	paddingLeft: '12px',
	paddingRight: '12px'
});

export const ColorMainBox: SxProps<Theme> = () => ({
	display: 'flex',
	alignItems: 'center',
	px: 1
});

export const ColorDropDownPaper: SxProps<Theme> = () => ({
	mt: 1,
	p: 1,
	display: 'grid',
	gridTemplateColumns: 'repeat(7, 24px)',
	gap: 1
});

export const ColorDropDownBox = ({ color }: { color: string }): SxProps<Theme> => ({
	width: 24,
	height: 24,
	backgroundColor: color,
	borderRadius: '4px',
	border: '1px solid #ccc',
	cursor: 'pointer',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	'&:hover': {
		border: '2px solid black'
	}
});

export const EditorContainerBox: SxProps<Theme> = (_theme) => ({
	width: '100%'
});

export const EditorWrapperBox: SxProps<Theme> = () => ({
	width: '100%',
	my: 2,
	display: 'flex',
	flexDirection: 'column',
	gap: 2
});

export const ButtonBox: SxProps<Theme> = () => ({
	display: 'flex',
	justifyContent: 'flex-end'
});

export const RichEditorBox: SxProps<Theme> = (theme) => ({
	width: '100%',
	overflow: 'hidden',
	'& .MuiRichTextEditor-root': {
		overflow: 'auto',
		[theme.breakpoints.down('sm')]: {
			minHeight: '200px',
			maxHeight: '50vh'
		},
		[theme.breakpoints.between('sm', 'md')]: {
			minHeight: '300px',
			maxHeight: '60vh'
		},
		[theme.breakpoints.up('md')]: {
			minHeight: '400px',
			maxHeight: '70vh'
		}
	},
	'& .ProseMirror': {
		transition: `all ${transitions.duration} ${transitions.easing}`
	},
	'& .MuiButton-root': {
		transition: `all ${transitions.duration} ${transitions.easing}`
	},
	'& .MuiBox-root': {
		transition: `all ${transitions.duration} ${transitions.easing}`
	}
});
