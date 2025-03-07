import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { ThemeContext } from '@/context/ThemeContext';
import { TProps } from '@/types';
import darkTheme from './darkTheme';
import lightTheme from './lightTheme';

const ThemeProviderWrapper: React.FC<TProps> = ({ children }) => {
	const [mode, setMode] = useState<'light' | 'dark'>('light');
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		const storedTheme = localStorage.getItem('mode') as 'light' | 'dark' | null;
		if (storedTheme) {
			setMode(storedTheme);
		}
		setIsMounted(true);
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
	}

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
