'use client';
import { useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { RootState } from '@/redux/store';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { fetchSpaceData } from '@/redux/space';
import { ISpace } from '@/types';

const SpacePage = () => {
	const dispatch = useAppDispatch();
	const { spaces } = useAppSelector((state: RootState) => state.space);

	useEffect(() => {
		dispatch(fetchSpaceData());
	}, []);

	return (
		<Box sx={{ p: 3 }}>
			<Typography variant="h4" gutterBottom>
				Space Management
			</Typography>
			<List>
				{spaces.map((space: ISpace) => (
					<ListItem key={space.id}>
						<ListItemText primary={space.name} secondary={space.description} />
					</ListItem>
				))}
			</List>
		</Box>
	);
};

export default SpacePage;
