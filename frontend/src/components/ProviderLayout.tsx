'use client';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import AppBar from '@/components/AppBar';
import DrawerLeft from '@/components/DrawerLeft';
import AuthProvider from '@/context/AuthProvider';
import { useAuth } from '@/context/AuthContext';
import { store } from '@/redux/store';
import ThemeProviderWrapper from '@/theme/ThemeProviderWrapper';
import { TComponent } from '@/types';
import { useRouter } from 'next/navigation';

const ProviderLayout: React.FC<TComponent> = ({ children }) => {
	return (
		<Provider store={store}>
			<AuthProvider>
				<ThemeProviderWrapper>
					<AuthContent>{children}</AuthContent>
				</ThemeProviderWrapper>
			</AuthProvider>
		</Provider>
	);
};

const AuthContent: React.FC<TComponent> = ({ children }) => {
	const { user } = useAuth();
	const router = useRouter();
	const isValid = user === undefined || user === null;

	useEffect(() => {
		if (isValid) {
			router.push('/login');
		} else {
			router.push('/dashboard');
		}
	}, [isValid, router]);

	return (
		<>
			{!isValid && <AppBar />}
			{!isValid ? <DrawerLeft>{children}</DrawerLeft> : children}
		</>
	);
};

export default ProviderLayout;
