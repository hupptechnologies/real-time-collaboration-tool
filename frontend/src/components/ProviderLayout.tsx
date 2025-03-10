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
			<AuthProvider>
				<ThemeProviderWrapper>
					<ToasterProvider>
						<Auth>{children}</Auth>
					</ToasterProvider>
				</ThemeProviderWrapper>
			</AuthProvider>
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
