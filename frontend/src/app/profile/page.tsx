'use client';
import { EditOutlined, SaveAltOutlined } from '@mui/icons-material';
import {
	Card,
	CardContent,
	Typography,
	Container,
	Avatar,
	TextField,
	IconButton,
	Box
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { fetchUserDataAction, updateUserAction } from '@/redux/user';
import { IAPIResponse, IUser } from '@/types';
import { ProfileAvatar, ProfileCard, ProfileContainer, ProfileEditBox } from '@/styles';

const Profile: React.FC = () => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.user);
	const [editing, setEditing] = useState<boolean>(false);
	const [newName, setNewName] = useState<string>(user.username || '');

	useEffect(() => {
		fetchUserData();
	}, []);

	const fetchUserData = () => {
		dispatch(fetchUserDataAction());
	};

	const handleCallback = (res: IAPIResponse<IUser>) => {
		if (res.success) {
			fetchUserData();
			setEditing(false);
		}
	};

	const handleSave = () => {
		if (newName.trim() === user.username) {
			setEditing(false);
			return;
		}
		dispatch(updateUserAction({ data: { username: newName }, callback: handleCallback }));
	};

	return (
		<Container maxWidth="sm" sx={ProfileContainer}>
			<Card sx={ProfileCard}>
				<CardContent>
					<Avatar src={''} alt={user.username} sx={ProfileAvatar} />
					{editing ? (
						<Box sx={ProfileEditBox}>
							<TextField
								value={newName}
								onChange={(e) => setNewName(e.target.value)}
								autoFocus
								variant="outlined"
								size="small"
								sx={{ maxWidth: 180 }}
							/>
							<IconButton size="small" color="primary" onClick={handleSave}>
								<SaveAltOutlined />
							</IconButton>
						</Box>
					) : (
						<Box sx={ProfileEditBox}>
							<Typography variant="h5" fontWeight={600}>
								{user.username}
							</Typography>
							<IconButton size="small" onClick={() => setEditing(true)} sx={{ color: '#1976d2' }}>
								<EditOutlined />
							</IconButton>
						</Box>
					)}
					<Typography variant="body1" color="text.secondary" sx={{ mt: 1, fontWeight: 500 }}>
						{user.email}
					</Typography>
					<Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontStyle: 'italic' }}>
						ID: {user.id}
					</Typography>
				</CardContent>
			</Card>
		</Container>
	);
};

export default ProtectedRoute(Profile);
