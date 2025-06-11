import { createPage } from '@/services/page';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateErrorHandler } from '@/redux/error/slice';
import { IAsyncThunkArg, IPage, IPageCreationAttribute } from '@/types';

export const createPageAction = createAsyncThunk(
	'page/new',
	async (
		{ data, callback }: IAsyncThunkArg<IPageCreationAttribute, IPage>,
		{ fulfillWithValue, rejectWithValue, dispatch }
	) => {
		try {
			const response = await createPage(data);
			if (response.data && response.success && callback) {
				callback(response);
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
