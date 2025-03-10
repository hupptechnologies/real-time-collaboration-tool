'use client';
import React, { useLayoutEffect } from 'react';
import { Stack } from '@mui/material';
import { redirect } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import LoginForm from '@/components/LoginForm';
import { MainStackStyle, StackNextStyle, StackStyle } from '@/styles';

const Login: React.FC = () => {
	const { user } = useAuth();
	useLayoutEffect(() => {
		if (user) {
			redirect('/dashboard');
		}
	}, []);
	return (
		<Stack direction="column" component="main" sx={MainStackStyle}>
			<Stack direction={{ xs: 'column-reverse', md: 'row' }} sx={StackStyle}>
				<Stack direction={{ xs: 'column-reverse', md: 'row' }} sx={StackNextStyle}>
					<LoginForm />
				</Stack>
			</Stack>
		</Stack>
	);
};

export default Login;
