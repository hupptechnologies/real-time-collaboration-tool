import * as React from 'react';
import { StyledToggleButton } from '@/styles';
import { TStyledToggleProps } from '@/types';

const Toggle = ({
	children,
	className,
	sizeVariant = 'sm',
	colorVariant = 'default',
	...props
}: TStyledToggleProps) => {
	return (
		<StyledToggleButton
			className={className}
			sizeVariant={sizeVariant}
			colorVariant={colorVariant}
			{...props}>
			{children}
		</StyledToggleButton>
	);
};

export default Toggle;
