import { createSlice } from '@reduxjs/toolkit';
import { IUserState } from '@/types';
import { fetchUserDataAction, updateUserAction } from '.';

const initialState: IUserState = {
	user: {},
	loading: false,
	error: null
};

const spaceSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchUserDataAction.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchUserDataAction.fulfilled, (state, action) => {
			state.loading = false;
			state.user = action.payload;
		});
		builder.addCase(fetchUserDataAction.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || 'Failed to fetch user';
		});
		builder.addCase(updateUserAction.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(updateUserAction.fulfilled, (state) => {
			state.loading = false;
		});
		builder.addCase(updateUserAction.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || 'Failed to fetch user';
		});
	}
});

export default spaceSlice.reducer;
