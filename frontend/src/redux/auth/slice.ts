import { createSlice } from '@reduxjs/toolkit';
import { IAuthState } from '@/types';

const initialState: IAuthState = {
	isLoggedIn: false,
	token: ''
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		updateAccessToken: (state, action) => {
			state.token = action.payload;
			state.isLoggedIn = true;
		},
		resetAuthState: () => initialState
	}
});

export const { updateAccessToken, resetAuthState } = authSlice.actions;

export const fetchAccessToken = (state: { auth: { token: string } }) => state.auth.token;
export default authSlice.reducer;
