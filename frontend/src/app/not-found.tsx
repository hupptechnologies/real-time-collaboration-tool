'use client';
import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const NotFoundPage = () => {
	const router = useRouter();
	const handleGoHome = () => router.push('/login');
	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			height="100vh"
			textAlign="center"
			bgcolor="background.default"
			p={3}>
			<Typography variant="h1" color="primary" gutterBottom>
				404
			</Typography>
			<Typography variant="h5" gutterBottom>
				Oops! The page you’re looking for doesn’t exist.
			</Typography>
			<Typography variant="body1" color="text.secondary" mb={3}>
				It might have been moved or deleted.
			</Typography>
			<Button variant="contained" color="primary" onClick={handleGoHome}>
				Go to Homepage
			</Button>
		</Box>
	);
};

export default NotFoundPage;
