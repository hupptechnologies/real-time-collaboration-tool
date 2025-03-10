'use client';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const ProtectedRoute = (Component: any) => {
	const withAuth = (props: any) => {
		const { user } = useAuth();
		useEffect(() => {
			if (!user) {
				redirect('/');
			}
		}, []);

		if (!user) {
			return null;
		}

		return <Component {...props} />;
	};

	return withAuth;
};

export default ProtectedRoute;
