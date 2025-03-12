'use client';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { useToaster } from './ToasterContext';
import { TProps, TUser } from '@/types';
import { login } from '@/services/auth';

const AuthProvider: React.FC<TProps> = ({ children }) => {
	const router = useRouter();
	const { showToaster } = useToaster();
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [loading] = useState<boolean>(false);
	const [user, setUser] = useState<TUser | null>(null);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			setIsAuthenticated(true);
		}
	}, []);

	const handleLogin = async (email: string, password: string): Promise<void> => {
		try {
			const res = await login(email, password, showToaster);
			localStorage.setItem('token', res.headers.token);
			setIsAuthenticated(true);
			setUser(res.data.data);
			// redirect('/dashboard');
			router.push('/dashboard');
		} catch (error: any) {
			showToaster(error.message, 'error');
		}
	};

	const handleLogout = (): void => {
		localStorage.removeItem('token');
		setIsAuthenticated(false);
		setUser(null);
		router.push('/login');
		showToaster('Logout...', 'success');
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				isLoading: loading,
				user,
				login: handleLogin,
				logout: handleLogout
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
