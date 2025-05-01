import { styled, SxProps, Theme, ToggleButton } from '@mui/material';
import { ICustomToggleProps } from '@/types';

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

export const MenuOptionBox: SxProps<Theme> = () => ({
	border: '1px solid #ccc',
	borderRadius: 2,
	p: 1,
	mb: 1,
	display: 'flex',
	gap: 2,
	zIndex: 50,
	flexWrap: 'wrap'
});
