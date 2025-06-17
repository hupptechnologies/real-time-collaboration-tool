import { createSlice } from '@reduxjs/toolkit';
import { IPageState } from '@/types';
import { createPageAction, getPageAction, updatePageAction } from '.';

const initialState: IPageState = {
	loading: false,
	error: null,
	page: null
};

const pageSlice = createSlice({
	name: 'page',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(createPageAction.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(createPageAction.fulfilled, (state) => {
			state.loading = false;
		});
		builder.addCase(createPageAction.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || 'Failed';
		});
		builder.addCase(getPageAction.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getPageAction.fulfilled, (state, { payload }) => {
			state.loading = false;
			state.page = payload;
		});
		builder.addCase(getPageAction.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || 'Failed';
		});
		builder.addCase(updatePageAction.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(updatePageAction.fulfilled, (state) => {
			state.loading = false;
		});
		builder.addCase(updatePageAction.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || 'Failed';
		});
	}
});

export default pageSlice.reducer;
