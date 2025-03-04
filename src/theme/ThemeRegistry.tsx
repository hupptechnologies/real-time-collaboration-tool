'use client';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

const ThemeRegistry = ({ children }) => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline>{children}</CssBaseline>
		</ThemeProvider>
	);
};

export default ThemeRegistry;
