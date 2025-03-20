import { combineReducers } from '@reduxjs/toolkit';
import auth from './auth/slice';
import space from './space/slice';
import counterReducer from './counter/slice';

const combinedReducers = combineReducers({
	auth: auth,
	space: space,
	counter: counterReducer
});

export default combinedReducers;
