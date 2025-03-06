import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TCounterState } from '@/types';

const initialState: TCounterState = {
	count: 0
};

const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		increment: (state) => {
			state.count += 1;
		},
		decrement: (state) => {
			state.count -= 1;
		},
		incrementByAmount: (state, action: PayloadAction<number>) => {
			state.count += action.payload;
		}
	},
	extraReducers: () => {}
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
