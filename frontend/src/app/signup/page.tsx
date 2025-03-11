'use client';
import * as React from 'react';
import {
	Box,
	Button,
	FormLabel,
	FormControl,
	Link,
	TextField,
	Typography,
	Stack,
	Card
} from '@mui/material';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { useToaster } from '@/context/ToasterContext';
import { signup } from '@/services/auth';
import { IFormValues } from '@/types';
import { signupValidationSchema } from '@/utils/validation';
import { cardStyles, MainStackStyle, StackNextStyle, StackStyle } from '@/styles';

const SignUp = () => {
	const router = useRouter();
	const { showToaster } = useToaster();

	const handleSignUp = async (values: any) => {
		try {
			await signup(values.username, values.email, values.password, showToaster);
			showToaster('Signup successful!', 'success');
			router.push('/login');
		} catch (error) {
			const axiosError = error as AxiosError;
			showToaster(axiosError.message || 'Signup failed', 'error');
		}
	};

	const formik = useFormik<IFormValues>({
		initialValues: { username: '', email: '', password: '' },
		validationSchema: signupValidationSchema,
		onSubmit: handleSignUp
	});

	return (
		<Stack direction="column" justifyContent="space-between" sx={MainStackStyle}>
			<Stack direction={{ xs: 'column-reverse', md: 'row' }} sx={StackStyle}>
				<Stack direction={{ xs: 'column-reverse', md: 'row' }} sx={StackNextStyle}>
					<Card variant="outlined" sx={cardStyles}>
						<Typography
							component="h1"
							variant="h4"
							sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
							Sign up
						</Typography>
						<Box
							component="form"
							onSubmit={formik.handleSubmit}
							sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
							<FormControl>
								<FormLabel htmlFor="username">Username</FormLabel>
								<TextField
									value={formik.values.username}
									onChange={formik.handleChange}
									error={formik.touched.username && !!formik.errors.username}
									helperText={formik.touched.username && formik.errors.username}
									autoComplete="username"
									name="username"
									required
									fullWidth
									id="username"
									placeholder="Username"
									color={formik.touched.username && !!formik.errors.username ? 'error' : 'primary'}
								/>
							</FormControl>
							<FormControl>
								<FormLabel htmlFor="email">Email</FormLabel>
								<TextField
									value={formik.values.email}
									onChange={formik.handleChange}
									error={formik.touched.email && !!formik.errors.email}
									helperText={formik.touched.email && formik.errors.email}
									required
									fullWidth
									id="email"
									placeholder="your@email.com"
									name="email"
									autoComplete="email"
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
									required
									fullWidth
									name="password"
									placeholder="••••••"
									type="password"
									id="password"
									autoComplete="new-password"
									variant="outlined"
									color={formik.touched.password && !!formik.errors.password ? 'error' : 'primary'}
								/>
							</FormControl>
							<Button type="submit" fullWidth variant="contained">
								Sign up
							</Button>
						</Box>
						<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
							<Typography sx={{ textAlign: 'center' }}>
								Already have an account?{' '}
								<Link href="/login" variant="body2" sx={{ alignSelf: 'center' }}>
									sign in
								</Link>
							</Typography>
						</Box>
					</Card>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default SignUp;
