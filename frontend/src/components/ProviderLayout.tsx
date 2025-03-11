'use client';
import { Provider } from 'react-redux';
import AppBar from '@/components/AppBar';
import DrawerLeft from '@/components/DrawerLeft';
import AuthProvider from '@/context/AuthProvider';
import ToasterProvider from '@/context/ToasterProvider';
import { useAuth } from '@/context/AuthContext';
import { store } from '@/redux/store';
import ThemeProviderWrapper from '@/theme/ThemeProviderWrapper';
import { TProps } from '@/types';

const ProviderLayout: React.FC<TProps> = ({ children }) => {
	return (
		<Provider store={store}>
			<ToasterProvider>
				<AuthProvider>
					<ThemeProviderWrapper>
						<Auth>{children}</Auth>
					</ThemeProviderWrapper>
				</AuthProvider>
			</ToasterProvider>
		</Provider>
	);
};

const Auth: React.FC<TProps> = ({ children }) => {
	const { user } = useAuth();
	return (
		<>
			{user && <AppBar />}
			{user ? <DrawerLeft>{children}</DrawerLeft> : children}
		</>
	);
};
export default ProviderLayout;
