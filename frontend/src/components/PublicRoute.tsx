'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const PublicRoute = (Component: React.ComponentType) => {
	return function WithPublicRoute(props: any) {
		const { isAuthenticated } = useAuth();
		const router = useRouter();

		useEffect(() => {
			if (isAuthenticated) {
				router.push('/home');
			}
		}, [isAuthenticated]);

		if (isAuthenticated) {
			return null;
		}

		return <Component {...props} />;
	};
};

export default PublicRoute;
