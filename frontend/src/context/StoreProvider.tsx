'use client';
import { AppStore, persistor, store } from '@/redux/store';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { TProps } from '@/types';

const StoreProvider = ({ children }: TProps) => {
	const storeRef = useRef<AppStore | null>(null);

	if (!storeRef.current) {
		storeRef.current = store;
	}

	return (
		<Provider store={storeRef.current}>
			<PersistGate persistor={persistor}>{children}</PersistGate>
		</Provider>
	);
};

export default StoreProvider;
