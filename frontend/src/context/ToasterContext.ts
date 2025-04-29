import { createContext, useContext } from 'react';
import { TToasterContextType } from '@/types';

export const ToasterContext = createContext<TToasterContextType | null>(null);
export const useToaster = () => {
	const context = useContext(ToasterContext);
	if (!context) {
		throw new Error('useToaster must be used within a ToasterProvider');
	}
	return context;
};
