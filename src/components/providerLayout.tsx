'use client';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { TComponent } from '@/types';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@/theme/theme';

const ProviderLayout: React.FC<TComponent> = ({ children }) => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline>
				<Provider store={store}>{children}</Provider>
			</CssBaseline>
		</ThemeProvider>
	);
};

export default ProviderLayout;
