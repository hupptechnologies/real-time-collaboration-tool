import { combineReducers } from '@reduxjs/toolkit';
import auth from './auth/slice';
import error from './error/slice';
import space from './space/slice';

const combinedReducers = combineReducers({
	auth: auth,
	error: error,
	space: space
});

export default combinedReducers;
