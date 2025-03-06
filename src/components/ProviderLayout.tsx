'use client';
import { Provider } from 'react-redux';
import AppBar from '@/components/AppBar';
import DrawerLeft from '@/components/DrawerLeft';
import ThemeProviderWrapper from '@/theme/ThemeProviderWrapper';
import { store } from '@/redux/store';
import { TComponent } from '@/types';

const ProviderLayout: React.FC<TComponent> = ({ children }) => {
	return (
		<ThemeProviderWrapper>
			<Provider store={store}>
				<AppBar />
				<DrawerLeft>{children}</DrawerLeft>
			</Provider>
		</ThemeProviderWrapper>
	);
};

export default ProviderLayout;
