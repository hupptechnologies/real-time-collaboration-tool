import { getUser, updateUser } from '@/services/user';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateErrorHandler } from '@/redux/error/slice';
import { IUserThunkProps } from '@/types';

export const fetchUserDataAction = createAsyncThunk(
	'user/detail',
	async (_, { fulfillWithValue, rejectWithValue, dispatch }) => {
		try {
			const response = await getUser();
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

export const updateUserAction = createAsyncThunk(
	'user/edit',
	async ({ data, callback }: IUserThunkProps, { fulfillWithValue, rejectWithValue, dispatch }) => {
		try {
			const response = await updateUser(data);
			if (response.success) {
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
