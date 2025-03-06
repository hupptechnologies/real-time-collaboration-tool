import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TComponent } from 'types/common';
import { AuthContext } from './AuthContext';

const AuthProvider: React.FC<TComponent> = ({ children }: TComponent) => {
	const [user, setUser] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		const storedUser = localStorage.getItem('user');
		if (storedUser !== null) {
			setUser(storedUser);
		}
	}, []);

	const login = async (email: string, password: string): Promise<void> => {
		try {
			const res = await fetch('/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password })
			});
			console.log('### res ###', res);
			// if (!res.ok) {
			// 	throw new Error('Invalid credentials');
			// }

			localStorage.setItem('user', email);
			setUser(email);
			router.push('/dashboard');
		} catch (error) {
			console.error((error as Error).message);
		}
	};

	const logout = (): void => {
		localStorage.removeItem('user');
		setUser(null);
		router.push('/login');
	};

	return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
