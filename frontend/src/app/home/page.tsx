'use client';
import { useEffect } from 'react';
import {
	Box,
	Typography,
	Grid2,
	Card,
	CardContent,
	Avatar,
	Tooltip,
	IconButton
} from '@mui/material';
import { Edit, Add } from '@mui/icons-material';
import ProtectedRoute from '@/components/ProtectedRoute';
import LoadingIndicator from '@/components/Loader';
import { RootState } from '@/redux/store';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { fetchSpaceData } from '@/redux/space';
import { ISpace } from '@/types';
import { SpaceCard } from '@/styles';

const SpacePage = () => {
	const dispatch = useAppDispatch();
	const { spaces, loading } = useAppSelector((state: RootState) => state.space);

	useEffect(() => {
		dispatch(fetchSpaceData());
	}, []);

	return (
		<Box sx={{ p: 3 }}>
			<LoadingIndicator loader={loading} />
			<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<Typography variant="h4" gutterBottom>
					Projects
				</Typography>
				<Box>
					<Tooltip title="Add">
						<IconButton>
							<Add />
						</IconButton>
					</Tooltip>
				</Box>
			</Box>
			<Grid2 container spacing={2}>
				{spaces.map((space: ISpace) => (
					<Grid2 key={space.name} size={{ xs: 12, sm: 6, md: 4 }}>
						<Card sx={SpaceCard}>
							<CardContent>
								<Box display="flex" alignItems="center" gap={2}>
									<Avatar src={''} alt={space.name} sx={{ width: 48, height: 48 }} />
									<Box flex={1}>
										<Typography variant="h6" fontWeight="bold">
											{space.name}
										</Typography>
										<Typography variant="body2" color="text.secondary">
											{space.description}
										</Typography>
									</Box>
									<Box>
										<Tooltip title="Edit">
											<IconButton>
												<Edit />
											</IconButton>
										</Tooltip>
									</Box>
								</Box>
							</CardContent>
						</Card>
					</Grid2>
				))}
			</Grid2>
		</Box>
	);
};

export default ProtectedRoute(SpacePage);
