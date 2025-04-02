import { createSlice } from '@reduxjs/toolkit';
import { ISpaceState } from '@/types';
import {
	fetchSpaceDataAction,
	createSpaceAction,
	updateSpaceAction,
	deleteSpaceAction,
	fetchSingleSpaceAction
} from '.';

const initialState: ISpaceState = {
	spaces: [],
	space: {},
	loading: false,
	error: null
};

const spaceSlice = createSlice({
	name: 'space',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchSpaceDataAction.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchSpaceDataAction.fulfilled, (state, action) => {
			state.loading = false;
			state.spaces = action.payload;
		});
		builder.addCase(fetchSpaceDataAction.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || 'Failed to fetch spaces';
		});
		builder.addCase(fetchSingleSpaceAction.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchSingleSpaceAction.fulfilled, (state, action) => {
			console.info('action.payload', action.payload);
			state.loading = false;
			state.space = action.payload;
		});
		builder.addCase(fetchSingleSpaceAction.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || 'Failed to fetch spaces';
		});
		builder.addCase(createSpaceAction.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(createSpaceAction.fulfilled, (state) => {
			state.loading = false;
		});
		builder.addCase(createSpaceAction.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || 'Failed to fetch spaces';
		});
		builder.addCase(updateSpaceAction.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(updateSpaceAction.fulfilled, (state) => {
			state.loading = false;
		});
		builder.addCase(updateSpaceAction.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || 'Failed to fetch spaces';
		});
		builder.addCase(deleteSpaceAction.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(deleteSpaceAction.fulfilled, (state) => {
			state.loading = false;
		});
		builder.addCase(deleteSpaceAction.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || 'Failed to fetch spaces';
		});
	}
});

export default spaceSlice.reducer;
