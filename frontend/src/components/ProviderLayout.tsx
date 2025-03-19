'use client';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppBar from '@/components/AppBar';
import AuthProvider from '@/context/AuthProvider';
import ToasterProvider from '@/context/ToasterProvider';
import { useAuth } from '@/context/AuthContext';
import { persistor, store } from '@/redux/store';
import ThemeProviderWrapper from '@/theme/ThemeProviderWrapper';
import { TProps } from '@/types';

const ProviderLayout: React.FC<TProps> = ({ children }) => {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<ToasterProvider>
					<AuthProvider>
						<ThemeProviderWrapper>
							<Auth>{children}</Auth>
						</ThemeProviderWrapper>
					</AuthProvider>
				</ToasterProvider>
			</PersistGate>
		</Provider>
	);
};

const Auth: React.FC<TProps> = React.memo(({ children }) => {
	const { isAuthenticated } = useAuth();
	return (
		<>
			{isAuthenticated && <AppBar />}
			{children}
		</>
	);
});
export default ProviderLayout;
