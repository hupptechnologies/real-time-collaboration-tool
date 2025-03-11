import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AuthContext } from './AuthContext';
import { useToaster } from './ToasterContext';
import { TProps } from '@/types';
import { login } from '@/services/auth';

const AuthProvider: React.FC<TProps> = ({ children }) => {
	const [user, setUser] = useState<string | null>(null);
	const router = useRouter();
	const { showToaster } = useToaster();

	const handleLogin = async (email: string, password: string): Promise<void> => {
		try {
			const res = await login(email, password, showToaster);
			console.info(res);
			localStorage.setItem('token', res.headers.token);
			setUser(res.data.data);
			router.push('/dashboard');
		} catch (error: any) {
			showToaster(error.message, 'error');
		}
	};

	const handleLogout = (): void => {
		localStorage.removeItem('token');
		setUser(null);
		router.push('/login');
		showToaster('Logout...', 'success');
	};

	return (
		<AuthContext.Provider value={{ user, login: handleLogin, logout: handleLogout }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
