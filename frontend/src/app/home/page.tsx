'use client';
import { useEffect, useState } from 'react';
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
import DynamicModal from '@/components/DynamicModal';
import LoadingIndicator from '@/components/Loader';
import ProtectedRoute from '@/components/ProtectedRoute';
import SpaceForm from '@/components/SpaceForm';
import { useToaster } from '@/context/ToasterContext';
import { RootState } from '@/redux/store';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { createSpaceAction, fetchSpaceData } from '@/redux/space';
import { ISpace } from '@/types';
import { SpaceCard } from '@/styles';

const SpacePage = () => {
	const dispatch = useAppDispatch();
	const { showToaster } = useToaster();
	const { spaces, loading } = useAppSelector((state: RootState) => state.space);
	const [open, setOpen] = useState(false);

	const handleModelOpen = () => {
		setOpen(true);
	};

	useEffect(() => {
		dispatch(fetchSpaceData());
	}, []);

	const handleSubmit = (values: ISpace) => {
		dispatch(createSpaceAction({ data: values, callback: handleCallback }));
		setOpen(false);
	};

	const handleCallback = (data: any) => {
		if (data.success) {
			dispatch(fetchSpaceData());
			showToaster(data.message, 'success');
		}
	};

	return (
		<Box sx={{ p: 3 }}>
			<LoadingIndicator loader={loading} />
			<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<Typography variant="h4" gutterBottom>
					Projects
				</Typography>
				<Box>
					<Tooltip title="Add">
						<IconButton onClick={handleModelOpen}>
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
			<DynamicModal
				title="New Space"
				open={open}
				onClose={() => setOpen(false)}
				content={<SpaceForm handleSubmit={handleSubmit} setOpen={setOpen} />}
			/>
		</Box>
	);
};

export default ProtectedRoute(SpacePage);
