import { getAllSpace } from '@/services/space';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateErrorHandler } from '@/redux/error/slice';

export const fetchSpaceData = createAsyncThunk(
	'space/getAll',
	async (_, { fulfillWithValue, rejectWithValue, dispatch }) => {
		try {
			const response = await getAllSpace();
			if (response.data && response.success) {
				const { data } = response;
				return fulfillWithValue(data);
			}
			return fulfillWithValue([]);
		} catch (err: any) {
			const error = err.response.data;
			dispatch(
				updateErrorHandler({
					isOpen: true,
					message: error.message,
					type: 'error'
				})
			);
			return rejectWithValue(null);
		}
	}
);
