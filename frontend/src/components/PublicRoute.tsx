'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const PublicRoute = <P extends object>(Component: React.ComponentType<P>) => {
	return function WithPublicRoute(props: P) {
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
