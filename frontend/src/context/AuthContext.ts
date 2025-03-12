'use client';
import { useContext, createContext } from 'react';
import { TAuthContextType } from '@/types';

export const AuthContext = createContext<TAuthContextType | null>(null);

export const useAuth = (): TAuthContextType => {
	const context = useContext(AuthContext);
	if (context === null) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
