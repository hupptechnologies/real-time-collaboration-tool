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
	IconButton,
	TextField
} from '@mui/material';
import { Edit, Add, AssignmentOutlined, Delete, Check } from '@mui/icons-material';
import ConfirmModal from '@/components/ConfirmModal';
import DynamicModal from '@/components/DynamicModal';
import LoadingIndicator from '@/components/Loader';
import ProtectedRoute from '@/components/ProtectedRoute';
import SpaceForm from '@/components/SpaceForm';
import { useToaster } from '@/context/ToasterContext';
import { RootState } from '@/redux/store';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import {
	createSpaceAction,
	fetchSpaceDataAction,
	updateSpaceAction,
	deleteSpaceAction
} from '@/redux/space';
import { ISpace } from '@/types';
import { SpaceCard } from '@/styles';

const SpacePage = () => {
	const dispatch = useAppDispatch();
	const { showToaster } = useToaster();
	const { spaces, loading } = useAppSelector((state: RootState) => state.space);
	const [open, setOpen] = useState<boolean>(false);
	const [editId, setEditId] = useState<number | undefined>(undefined);
	const [editValue, setEditValue] = useState<string>('');
	const [deleteId, setDeleteId] = useState<number | undefined>(undefined);
	const [deleteValue, setDeleteValue] = useState<string>('');

	const handleModelOpen = () => {
		setOpen(true);
	};

	useEffect(() => {
		dispatch(fetchSpaceDataAction());
	}, []);

	const handleSubmit = (values: ISpace) => {
		dispatch(createSpaceAction({ data: values, callback: handleCallback }));
		setOpen(false);
	};

	const handleCallback = (data: any) => {
		if (data.success) {
			dispatch(fetchSpaceDataAction());
			showToaster(data.message, 'success');
		}
	};

	const handleEditClick = (space: ISpace) => {
		setEditId(space.id);
		setEditValue(space.name);
	};

	const handleSaveEdit = (space: ISpace) => {
		console.info(space);
		if (editValue.trim() && editValue !== space.name) {
			dispatch(
				updateSpaceAction({ data: { id: space.id, name: editValue }, callback: handleCallback })
			);
		}
		setEditId(undefined);
	};

	const handleDeleteClick = (space: ISpace) => {
		setDeleteId(space.id);
		setDeleteValue(space.name);
	};

	const handleConfirm = (confirmed: boolean) => {
		if (confirmed) {
			dispatch(
				deleteSpaceAction({ data: { id: deleteId, name: deleteValue }, callback: handleCallback })
			);
		}
		setDeleteValue('');
		setDeleteId(undefined);
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
					<Grid2 key={space.name} size={{ xs: 12, sm: 6, md: 3 }}>
						<Card sx={SpaceCard}>
							<CardContent>
								<Box display="flex" alignItems="center" gap={2}>
									<Avatar sx={{ backgroundColor: 'blue' }} variant="rounded">
										<AssignmentOutlined />
									</Avatar>
									<Box flex={1}>
										{editId === space.id ? (
											<TextField
												value={editValue}
												onChange={(e) => setEditValue(e.target.value)}
												onBlur={() => handleSaveEdit(space)}
												onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(space)}
												autoFocus
												fullWidth
												variant="standard"
											/>
										) : (
											<Typography variant="h6" fontWeight="bold">
												{space.name}
											</Typography>
										)}
									</Box>
									<Box>
										<Tooltip title="Edit">
											<IconButton onClick={() => handleEditClick(space)}>
												{editId === space.id ? <Check /> : <Edit />}
											</IconButton>
										</Tooltip>
										<Tooltip title="Delete">
											<IconButton onClick={() => handleDeleteClick(space)}>
												<Delete />
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
			<ConfirmModal
				open={deleteValue.trim() !== ''}
				title={`Are you sure you want to delete ${deleteValue} ?`}
				subTitle="This action cannot be undone."
				onClose={handleConfirm}
			/>
		</Box>
	);
};

export default ProtectedRoute(SpacePage);
