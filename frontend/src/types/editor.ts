import { ToggleButtonProps } from '@mui/material';

export interface ICustomToggleProps {
	sizeVariant?: 'default' | 'sm' | 'lg';
	colorVariant?: 'default' | 'outline';
}

export type TStyledToggleProps = ToggleButtonProps & ICustomToggleProps;
export interface IRichTextEditorProps {
	content: string;
	onChange: (_content: string) => void;
}
