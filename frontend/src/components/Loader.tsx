import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import { LoadingIndicatorProps } from '@/types';

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ loader = false }) => {
	return (
		<Backdrop sx={{ color: '#fff', zIndex: 1000 }} open={loader}>
			<CircularProgress size={20} color="inherit" />
		</Backdrop>
	);
};

export default LoadingIndicator;
