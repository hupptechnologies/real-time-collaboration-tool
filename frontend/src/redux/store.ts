import { configureStore, type Action, type ThunkAction } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import combinedReducers from './rootReducer';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['auth']
};

export const makeStore = () => {
	return configureStore({
		reducer: persistReducer(persistConfig, combinedReducers),
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: false,
				immutableCheck: false
			})
	});
};

export const store = makeStore();
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof combinedReducers>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
	ThunkReturnType,
	RootState,
	unknown,
	Action
>;
