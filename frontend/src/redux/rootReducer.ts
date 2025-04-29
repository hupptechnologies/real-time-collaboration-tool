import { combineReducers } from '@reduxjs/toolkit';
import auth from './auth/slice';
import error from './error/slice';
import folder from './folder/slice';
import space from './space/slice';
import user from './user/slice';

const combinedReducers = combineReducers({
	auth: auth,
	error: error,
	folder: folder,
	space: space,
	user: user
});

export default combinedReducers;
