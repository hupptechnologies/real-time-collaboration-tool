'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { useToaster } from './ToasterContext';
import { resetAuthState, updateAccessToken } from '@/redux/auth/slice';
import { useAppDispatch } from '@/redux/hook';
import { login } from '@/services/auth';
import { TProps, TUser } from '@/types';

const AuthProvider: React.FC<TProps> = ({ children }) => {
	const router = useRouter();
	const { showToaster } = useToaster();
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [loading] = useState<boolean>(false);
	const [user, setUser] = useState<TUser | null>(null);
	const dispatch = useAppDispatch();

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
			dispatch(updateAccessToken(res.headers.token));
			setIsAuthenticated(true);
			setUser(res.data.data);
			router.push('/home');
		} catch (error: any) {
			showToaster(error.message, 'error');
		}
	};

	const handleLogout = (): void => {
		localStorage.removeItem('token');
		dispatch(resetAuthState());
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
