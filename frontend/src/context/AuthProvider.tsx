import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TProps } from '@/types';
import { AuthContext } from './AuthContext';

const AuthProvider: React.FC<TProps> = ({ children }) => {
	const [user, setUser] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		const storedUser = localStorage.getItem('token');
		if (storedUser !== null) {
			setUser(storedUser);
		}
	}, []);

	const login = async (email: string, password: string): Promise<void> => {
		try {
			console.info(password);
			localStorage.setItem('token', email);
			setUser(email);
			router.push('/dashboard');
		} catch (error) {
			console.info((error as Error).message);
		}
	};

	const logout = (): void => {
		localStorage.removeItem('token');
		setUser(null);
		router.push('/login');
	};

	return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
