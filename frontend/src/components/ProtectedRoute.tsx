'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const ProtectedRoute = (Component: React.ComponentType) => {
	return function WithAuth(props: any) {
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
