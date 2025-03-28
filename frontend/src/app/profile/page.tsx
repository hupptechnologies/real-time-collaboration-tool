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
import React, { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';

const Profile: React.FC = () => {
	const [user, setUser] = useState({
		id: '123456',
		name: 'John Doe',
		email: 'johndoe@example.com',
		avatar: ''
	});

	const [editing, setEditing] = useState<boolean>(false);
	const [newName, setNewName] = useState<string>(user.name);

	const handleEdit = () => {
		setEditing(true);
	};

	const handleSave = () => {
		setUser({ ...user, name: newName });
		setEditing(false);
	};

	return (
		<Container maxWidth="sm" sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
			<Card
				sx={{
					p: 4,
					textAlign: 'center',
					boxShadow: 4,
					borderRadius: 4,
					maxWidth: 400,
					width: '100%',
					background: 'linear-gradient(135deg, #f3f3f3, #e0e0e0)'
				}}>
				<CardContent>
					<Avatar
						src={user.avatar}
						alt={user.name}
						sx={{ width: 100, height: 100, mx: 'auto', mb: 2, border: '3px solid #1976d2' }}
					/>
					{editing ? (
						<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
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
						<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
							<Typography variant="h5" fontWeight={600}>
								{user.name}
							</Typography>
							<IconButton size="small" onClick={handleEdit} sx={{ color: '#1976d2' }}>
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
