import React, { useState } from 'react';
import {
	Box,
	Button,
	Checkbox,
	Card,
	FormLabel,
	FormControl,
	FormControlLabel,
	Link,
	TextField,
	Typography
} from '@mui/material';
// import { useAuth } from '@/context/AuthContext';
import { cardStyles, emailBoxStyles } from '@/styles';

const LoginForm: React.FC = () => {
	// const { login } = useAuth();
	const [emailError, setEmailError] = useState(false);
	const [emailErrorMessage, setEmailErrorMessage] = useState('');
	const [passwordError, setPasswordError] = useState(false);
	const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
	// const [open, setOpen] = useState(false);

	// const handleClickOpen = (): void => {
	// 	setOpen(true);
	// };

	// const handleClose = (): void => {
	// 	setOpen(false);
	// };

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		if (emailError || passwordError) {
			event.preventDefault();
			return;
		}
		const data = new FormData(event.currentTarget);
		const email = (data.get('email') as string) ?? '';
		const password = (data.get('password') as string) ?? '';
		localStorage.setItem('user', email);
		console.log('email', email, password);
		// await login(email, password);
	};

	const validateInputs = (): boolean => {
		const email = document.getElementById('email') as HTMLInputElement;
		const password = document.getElementById('password') as HTMLInputElement;

		let isValid = true;

		if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
			setEmailError(true);
			setEmailErrorMessage('Please enter a valid email address.');
			isValid = false;
		} else {
			setEmailError(false);
			setEmailErrorMessage('');
		}

		if (!password.value || password.value.length < 6) {
			setPasswordError(true);
			setPasswordErrorMessage('Password must be at least 6 characters long.');
			isValid = false;
		} else {
			setPasswordError(false);
			setPasswordErrorMessage('');
		}
		return isValid;
	};

	return (
		<Card sx={cardStyles} variant="outlined">
			<Typography
				component="h1"
				variant="h4"
				sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
				Sign In
			</Typography>
			<Box component="form" onSubmit={handleSubmit} noValidate sx={emailBoxStyles}>
				<FormControl>
					<FormLabel htmlFor="email">Email</FormLabel>
					<TextField
						error={emailError}
						helperText={emailErrorMessage}
						id="email"
						type="email"
						name="email"
						placeholder="your@email.com"
						autoComplete="email"
						autoFocus
						required
						fullWidth
						variant="outlined"
						color={emailError ? 'error' : 'primary'}
					/>
				</FormControl>
				<FormControl>
					{/* <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
						<FormLabel htmlFor="password">Password</FormLabel>
						<Link
							component="button"
							type="button"
							onClick={handleClickOpen}
							variant="body2"
							sx={{ alignSelf: 'baseline' }}>
							Forgot your password?
						</Link>
					</Box> */}
					<TextField
						error={passwordError}
						helperText={passwordErrorMessage}
						name="password"
						placeholder="••••••"
						type="password"
						id="password"
						autoComplete="current-password"
						autoFocus
						required
						fullWidth
						variant="outlined"
						color={passwordError ? 'error' : 'primary'}
					/>
				</FormControl>
				<FormControlLabel
					control={<Checkbox value="remember" color="primary" />}
					label="Remember me"
				/>
				{/* <ForgotPassword open={open} handleClose={handleClose} /> */}
				<Button type="submit" fullWidth variant="contained" onClick={validateInputs}>
					Sign in
				</Button>
				<Typography sx={{ textAlign: 'center' }}>
					Don&apos;t have an account?{' '}
					<span>
						<Link
							href="/material-ui/getting-started/templates/sign-in/"
							variant="body2"
							sx={{ alignSelf: 'center' }}>
							Sign up
						</Link>
					</span>
				</Typography>
			</Box>
		</Card>
	);
};

export default LoginForm;
