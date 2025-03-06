import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import darkTheme from './darkTheme';
import lightTheme from './lightTheme';
import { ThemeContext } from '../utils/context';

const ThemeProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [mode, setMode] = useState<'light' | 'dark'>('dark'); // Default mode is 'dark'
	const [isMounted, setIsMounted] = useState(false); // Prevent flickering

	useEffect(() => {
		const storedTheme = localStorage.getItem('mode') as 'light' | 'dark' | null;
		if (storedTheme) {
			setMode(storedTheme);
		}
		setIsMounted(true); // Mark that hydration is complete
	}, []);

	const toggleThemeMode = (): void => {
		setMode((prevMode) => {
			const newMode = prevMode === 'light' ? 'dark' : 'light';
			localStorage.setItem('mode', newMode);
			return newMode;
		});
	};

	if (!isMounted) {
		return null;
	} // Prevent incorrect SSR theme before hydration

	return (
		<ThemeContext.Provider value={{ mode, toggleThemeMode }}>
			<ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</ThemeContext.Provider>
	);
};

export default ThemeProviderWrapper;
