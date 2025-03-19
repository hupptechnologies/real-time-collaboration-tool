import { combineReducers } from '@reduxjs/toolkit';
import auth from './auth/slice';
import counterReducer from './counter/slice';

const combinedReducers = combineReducers({
	auth: auth,
	counter: counterReducer
});

export default combinedReducers;
