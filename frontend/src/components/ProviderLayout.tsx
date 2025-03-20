'use client';
import React from 'react';
import AppBar from '@/components/AppBar';
import StoreProvider from '@/context/StoreProvider';
import AuthProvider from '@/context/AuthProvider';
import ToasterProvider from '@/context/ToasterProvider';
import ThemeProviderWrapper from '@/theme/ThemeProviderWrapper';
import { TProps } from '@/types';

const ProviderLayout: React.FC<TProps> = ({ children }) => {
	return (
		<StoreProvider>
			<ToasterProvider>
				<AuthProvider>
					<ThemeProviderWrapper>
						<AppBar />
						{children}
					</ThemeProviderWrapper>
				</AuthProvider>
			</ToasterProvider>
		</StoreProvider>
	);
};

export default ProviderLayout;
