'use client';
import React from 'react';
import { Stack } from '@mui/material';
import LoginForm from '@/components/LoginForm';
import { MainStackStyle, StackNextStyle, StackStyle } from '@/styles';

const Login: React.FC = () => {
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
