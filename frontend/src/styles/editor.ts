import {
	styled,
	SxProps,
	ToggleButton,
	ToggleButtonGroup,
	toggleButtonGroupClasses,
	Theme
} from '@mui/material';
import { ICustomToggleProps } from '@/types';

export const EditorMainBox: SxProps<Theme> = (theme) => ({
	'.custom-editor': {
		minHeight: '156px',
		border: '1px solid #ccc',
		borderRadius: 2,
		backgroundColor: theme.palette.grey[100],
		padding: theme.spacing(2)
	}
});

export const StyledToggleButton = styled(ToggleButton, {
	shouldForwardProp: (prop) => prop !== 'sizeVariant' && prop !== 'colorVariant'
})<ICustomToggleProps>(({ theme, sizeVariant = 'default', colorVariant = 'default' }) => ({
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	gap: theme.spacing(0.5),
	borderRadius: theme.shape.borderRadius,
	fontSize: theme.typography.pxToRem(14),
	fontWeight: 500,
	padding:
		sizeVariant === 'sm'
			? theme.spacing(1, 1.5)
			: sizeVariant === 'lg'
				? theme.spacing(1.25, 2.5)
				: theme.spacing(1, 2),
	minWidth: sizeVariant === 'sm' ? 32 : sizeVariant === 'lg' ? 40 : 36,
	border: colorVariant === 'outline' ? `1px solid ${theme.palette.divider}` : 'none',
	backgroundColor: colorVariant === 'outline' ? 'transparent' : 'inherit',
	'&.Mui-selected': {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.primary.contrastText
	},
	'&:hover': {
		backgroundColor:
			colorVariant === 'outline' ? theme.palette.action.hover : theme.palette.action.selected
	},
	'& svg': {
		pointerEvents: 'none',
		fontSize: 16,
		flexShrink: 0
	},
	'&:focus-visible': {
		outline: `3px solid ${theme.palette.primary.main}50`
	},
	transition: theme.transitions.create(['color', 'box-shadow'])
}));

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
	[`& .${toggleButtonGroupClasses.grouped}`]: {
		margin: theme.spacing(0.5),
		border: 0,
		borderRadius: theme.shape.borderRadius,
		[`&.${toggleButtonGroupClasses.disabled}`]: {
			border: 0
		}
	},
	[`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]: {
		marginLeft: -1,
		borderLeft: '1px solid transparent'
	}
}));

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
