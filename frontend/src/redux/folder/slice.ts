import { createSlice } from '@reduxjs/toolkit';
import { IFolderState } from '@/types';
import { createFolderAction, deleteFolderAction, updateFolderAction } from '.';

const initialState: IFolderState = {
	loading: false,
	error: null
};

const folderSlice = createSlice({
	name: 'folder',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(createFolderAction.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(createFolderAction.fulfilled, (state) => {
			state.loading = false;
		});
		builder.addCase(createFolderAction.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || 'Failed';
		});
		builder.addCase(updateFolderAction.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(updateFolderAction.fulfilled, (state) => {
			state.loading = false;
		});
		builder.addCase(updateFolderAction.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || 'Failed';
		});
		builder.addCase(deleteFolderAction.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(deleteFolderAction.fulfilled, (state) => {
			state.loading = false;
		});
		builder.addCase(deleteFolderAction.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || 'Failed';
		});
	}
});

export default folderSlice.reducer;
