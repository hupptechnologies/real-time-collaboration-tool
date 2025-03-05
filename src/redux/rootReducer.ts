import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counter/slice';

const combinedReducers = combineReducers({
	counter: counterReducer
});

export default combinedReducers;
