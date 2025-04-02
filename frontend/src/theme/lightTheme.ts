import { createTheme, Theme } from '@mui/material/styles';
import { Inter } from 'next/font/google';

const inter = Inter({
	weight: ['300', '400', '500', '600', '700'],
	subsets: ['latin'],
	display: 'swap'
});

const theme: Theme = createTheme({
	colorSchemes: {
		light: true
	},
	palette: {
		mode: 'light',
		primary: { main: '#0052CC' }, // Confluence blue
		background: { default: '#F4F5F7', paper: '#FFFFFF' },
		text: { primary: '#172B4D', secondary: '#42526E' }
	},
	typography: {
		fontFamily: inter.style.fontFamily
	}
});

export default theme;
