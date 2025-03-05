'use client';
import { Provider } from 'react-redux';
import AppBar from '@/components/AppBar';
import DrawerLeft from '@/components/DrawerLeft';
import { store } from '@/redux/store';
import { TComponent } from '@/types';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@/theme/theme';

const ProviderLayout: React.FC<TComponent> = ({ children }) => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline>
				<Provider store={store}>
					<AppBar />
					<DrawerLeft>{children}</DrawerLeft>
				</Provider>
			</CssBaseline>
		</ThemeProvider>
	);
};

export default ProviderLayout;
