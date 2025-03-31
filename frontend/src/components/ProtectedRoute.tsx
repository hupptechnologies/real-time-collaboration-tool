'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const ProtectedRoute = <P extends object>(Component: React.ComponentType<P>) => {
	return function WithAuth(props: P) {
		const { isAuthenticated } = useAuth();
		const router = useRouter();

		useEffect(() => {
			if (!isAuthenticated) {
				router.push('/login');
			}
		}, [isAuthenticated]);

		if (!isAuthenticated) {
			return null;
		}

		return <Component {...props} />;
	};
};

export default ProtectedRoute;
