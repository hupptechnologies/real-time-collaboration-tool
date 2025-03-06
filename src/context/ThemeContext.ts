import { useContext, createContext } from 'react';
import { TThemeContextType } from '@/types';

// Create the context with an explicit default value
export const ThemeContext = createContext<TThemeContextType>({
	mode: 'light',
	toggleThemeMode: () => {}
});

// Custom hook for consuming the context
export const useThemeContext = (): TThemeContextType => {
	const context = useContext(ThemeContext);
	if (context === null) {
		throw new Error('useThemeContext must be used within a ThemeProvider');
	}
	return context;
};
