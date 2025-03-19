import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import combinedReducers from './rootReducer';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['auth']
};
export const store = configureStore({
	reducer: persistReducer(persistConfig, combinedReducers),
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
			immutableCheck: false
		})
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
