'use client';
import React from 'react';
import {
	Stack,
	Box,
	Button,
	Card,
	FormLabel,
	FormControl,
	Link,
	TextField,
	Typography
} from '@mui/material';
import { useFormik } from 'formik';
import PublicRoute from '@/components/PublicRoute';
import { useAuth } from '@/context/AuthContext';
import { IFormValues } from '@/types';
import { loginValidationSchema } from '@/utils/validation';
import { MainStackStyle, StackNextStyle, StackStyle, cardStyles, emailBoxStyles } from '@/styles';

const Login: React.FC = () => {
	const { login } = useAuth();
	const formik = useFormik<IFormValues>({
		initialValues: { email: '', password: '' },
		validationSchema: loginValidationSchema,
		onSubmit: async (values: IFormValues) => {
			await login(values.email, values.password);
		}
	});
	return (
		<Stack direction="column" component="main" sx={MainStackStyle}>
			<Stack direction={{ xs: 'column-reverse', md: 'row' }} sx={StackStyle}>
				<Stack direction={{ xs: 'column-reverse', md: 'row' }} sx={StackNextStyle}>
					<Card sx={cardStyles} variant="outlined">
						<Typography
							component="h1"
							variant="h4"
							sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
							Sign In
						</Typography>
						<Box component="form" onSubmit={formik.handleSubmit} noValidate sx={emailBoxStyles}>
							<FormControl>
								<FormLabel htmlFor="email">Email</FormLabel>
								<TextField
									value={formik.values.email}
									onChange={formik.handleChange}
									error={formik.touched.email && !!formik.errors.email}
									helperText={formik.touched.email && formik.errors.email}
									id="email"
									type="email"
									name="email"
									placeholder="your@email.com"
									autoComplete="email"
									autoFocus
									required
									fullWidth
									variant="outlined"
									color={formik.touched.email && !!formik.errors.email ? 'error' : 'primary'}
								/>
							</FormControl>
							<FormControl>
								<FormLabel htmlFor="password">Password</FormLabel>
								<TextField
									value={formik.values.password}
									onChange={formik.handleChange}
									error={formik.touched.password && !!formik.errors.password}
									helperText={formik.touched.password && formik.errors.password}
									name="password"
									placeholder="••••••"
									type="password"
									id="password"
									autoComplete="current-password"
									autoFocus
									required
									fullWidth
									variant="outlined"
									color={formik.touched.password && !!formik.errors.password ? 'error' : 'primary'}
								/>
							</FormControl>
							<Button type="submit" fullWidth variant="contained">
								Sign in
							</Button>
							<Typography sx={{ textAlign: 'center' }}>
								Don&apos;t have an account?{' '}
								<span>
									<Link href="/signup" variant="body2" sx={{ alignSelf: 'center' }}>
										Sign up
									</Link>
								</span>
							</Typography>
						</Box>
					</Card>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default PublicRoute(Login);
