import { combineReducers } from '@reduxjs/toolkit';
import auth from './auth/slice';
import error from './error/slice';
import folder from './folder/slice';
import page from './page/slice';
import space from './space/slice';
import user from './user/slice';

const combinedReducers = combineReducers({
	auth: auth,
	error: error,
	folder: folder,
	page: page,
	space: space,
	user: user
});

export default combinedReducers;
