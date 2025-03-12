'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const PublicRoute = (Component: any) => {
	const withAuth = (props: any) => {
		const { isAuthenticated } = useAuth();
		const router = useRouter();
		useEffect(() => {
			if (isAuthenticated) {
				router.push('/dashboard');
			}
		}, []);

		if (isAuthenticated) {
			return null;
		}

		return <Component {...props} />;
	};

	return withAuth;
};

export default PublicRoute;
