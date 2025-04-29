import { createFolder, deleteFolder, updateFolder } from '@/services/folder';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateErrorHandler } from '@/redux/error/slice';
import { IAsyncThunkArg, IFolder, IFolderCreationAttribute } from '@/types';

export const createFolderAction = createAsyncThunk(
	'folde/new',
	async (
		{ data, callback }: IAsyncThunkArg<IFolderCreationAttribute, IFolder>,
		{ fulfillWithValue, rejectWithValue, dispatch }
	) => {
		try {
			const response = await createFolder(data);
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

export const updateFolderAction = createAsyncThunk(
	'folder/update',
	async (
		{ data, callback }: IAsyncThunkArg<Partial<IFolder>, IFolder>,
		{ fulfillWithValue, rejectWithValue, dispatch }
	) => {
		try {
			const response = await updateFolder(data);
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

export const deleteFolderAction = createAsyncThunk(
	'folder/delete',
	async (
		{ data, callback }: IAsyncThunkArg<IFolder>,
		{ fulfillWithValue, rejectWithValue, dispatch }
	) => {
		try {
			const response = await deleteFolder(data);
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
