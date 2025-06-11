import { createSlice } from '@reduxjs/toolkit';
import { IPageState } from '@/types';
import { createPageAction } from '.';

const initialState: IPageState = {
	loading: false,
	error: null
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
	}
});

export default pageSlice.reducer;
