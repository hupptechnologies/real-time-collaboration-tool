'use client';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme/theme';
import { TComponent } from '@/types';

const ThemeRegistry: React.FC<TComponent> = ({ children }: TComponent) => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline>{children}</CssBaseline>
		</ThemeProvider>
	);
};

export default ThemeRegistry;
