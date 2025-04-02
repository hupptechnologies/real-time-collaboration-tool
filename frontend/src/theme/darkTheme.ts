import { createTheme, Theme } from '@mui/material/styles';
import { Inter } from 'next/font/google';

const inter = Inter({
	weight: ['300', '400', '500', '600', '700'],
	subsets: ['latin'],
	display: 'swap'
});

const theme: Theme = createTheme({
	colorSchemes: {
		dark: true
	},
	palette: {
		mode: 'dark',
		primary: { main: '#2684FF' },
		background: { default: '#1E1E1E', paper: '#2C2C2C' },
		text: { primary: '#FFFFFF', secondary: '#B0BEC5' }
	},
	typography: {
		fontFamily: inter.style.fontFamily
	}
});

export default theme;
