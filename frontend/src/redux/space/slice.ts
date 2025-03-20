import { createSlice } from '@reduxjs/toolkit';
import { ISpaceState } from '@/types';
import { fetchSpaceData } from '.';

const initialState: ISpaceState = {
	spaces: [],
	loading: false,
	error: null
};

const spaceSlice = createSlice({
	name: 'space',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchSpaceData.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchSpaceData.fulfilled, (state, action) => {
			state.loading = false;
			state.spaces = action.payload;
		});
		builder.addCase(fetchSpaceData.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || 'Failed to fetch spaces';
		});
	}
});

export default spaceSlice.reducer;
