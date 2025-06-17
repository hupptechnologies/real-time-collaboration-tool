import { createPage, getPage, updatePage } from '@/services/page';
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

export const getPageAction = createAsyncThunk(
	'page/get',
	async (
		{ data, callback }: IAsyncThunkArg<Partial<IPage>, IPage>,
		{ fulfillWithValue, rejectWithValue, dispatch }
	) => {
		try {
			const response = await getPage(data);
			if (response.data && response.success && callback) {
				callback(response);
			}
			return fulfillWithValue(response.data);
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

export const updatePageAction = createAsyncThunk(
	'page/update',
	async (
		{ data, callback }: IAsyncThunkArg<Partial<IPage>, IPage>,
		{ fulfillWithValue, rejectWithValue, dispatch }
	) => {
		try {
			const response = await updatePage(data);
			if (response.data && response.success && callback) {
				callback(response);
			}
			return fulfillWithValue(null);
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
