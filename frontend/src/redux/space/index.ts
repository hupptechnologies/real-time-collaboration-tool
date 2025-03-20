import { getAllSpace } from '@/services/space';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSpaceData = createAsyncThunk(
	'space/getAll',
	async (_, { fulfillWithValue, rejectWithValue }) => {
		try {
			const response = await getAllSpace();
			console.info(response);
			if (response.data && response.success) {
				const { data } = response;
				return fulfillWithValue(data);
			}
			return fulfillWithValue([]);
		} catch (err: any) {
			console.info(err);
			return rejectWithValue(null);
		}
	}
);
