import { getAllSpace, createSpace, updateSpace, deleteSpace, getSpace } from '@/services/space';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateErrorHandler } from '@/redux/error/slice';
import { IAsyncThunkArg, ISpace } from '@/types';

export const fetchSpaceDataAction = createAsyncThunk(
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

export const createSpaceAction = createAsyncThunk(
	'space/create',
	async (
		{ data, callback }: IAsyncThunkArg<ISpace>,
		{ fulfillWithValue, rejectWithValue, dispatch }
	) => {
		try {
			const response = await createSpace(data);
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

export const updateSpaceAction = createAsyncThunk(
	'space/update',
	async (
		{ data, callback }: IAsyncThunkArg<ISpace>,
		{ fulfillWithValue, rejectWithValue, dispatch }
	) => {
		try {
			const response = await updateSpace(data);
			if (response && response.success && callback) {
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

export const deleteSpaceAction = createAsyncThunk(
	'space/delete',
	async (
		{ data, callback }: IAsyncThunkArg<ISpace>,
		{ fulfillWithValue, rejectWithValue, dispatch }
	) => {
		try {
			const response = await deleteSpace(data);
			if (response && response.success && callback) {
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

export const fetchSingleSpaceAction = createAsyncThunk(
	'space/single',
	async ({ data }: IAsyncThunkArg<ISpace>, { fulfillWithValue, rejectWithValue, dispatch }) => {
		try {
			const response = await getSpace(data);
			if (response.data && response.success) {
				const { data } = response;
				return fulfillWithValue(data);
			}
			return fulfillWithValue({});
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
