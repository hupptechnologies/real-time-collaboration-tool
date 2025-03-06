import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Theme } from '@mui/material';
import { TComponent, TThemeContextType } from '@/types';
import darkTheme from './darkTheme';
import lightTheme from './lightTheme';
import { ThemeContext } from '../utils/context';

const ThemeProviderWrapper: React.FC<TComponent> = ({ children }) => {
	const [mode, setMode] = useState<'light' | 'dark'>('dark');

	useEffect(() => {
		const storedTheme = localStorage.getItem('mode') as 'light' | 'dark' | null;
		if (storedTheme) {
			setMode(storedTheme);
		}
	}, []);

	const toggleThemeMode = (): void => {
		setMode((prevMode) => {
			const newMode = prevMode === 'light' ? 'dark' : 'light';
			localStorage.setItem('mode', newMode);
			return newMode;
		});
	};

	const getThemeColor = (mode: 'light' | 'dark'): Theme =>
		mode === 'dark' ? darkTheme : lightTheme;

	const themeContextValue: TThemeContextType = {
		mode,
		toggleThemeMode
	};

	return (
		<ThemeContext.Provider value={themeContextValue}>
			<ThemeProvider theme={getThemeColor(mode)}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</ThemeContext.Provider>
	);
};

export default ThemeProviderWrapper;
