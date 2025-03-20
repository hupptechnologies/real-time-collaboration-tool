import { createSlice } from '@reduxjs/toolkit';
import { IErrorState } from '@/types';

const initialState: IErrorState = {
	isOpen: false,
	message: '',
	type: ''
};

export const errorSlice = createSlice({
	name: 'error',
	initialState,
	reducers: {
		updateErrorHandler: (state, { payload }) => {
			state.isOpen = payload.isOpen;
			state.message = payload.message;
			state.type = payload.type;
		},
		resetErrorHandler: () => initialState
	}
});

export const { updateErrorHandler, resetErrorHandler } = errorSlice.actions;
export default errorSlice.reducer;
