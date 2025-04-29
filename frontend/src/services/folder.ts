import axiosInstance from '@/utils/axios';
import { IFolder } from '@/types';

export const createFolder = async (data: IFolder) => {
	const response = await axiosInstance.post('/folder/new', data);
	return response.data;
};

export const updateFolder = async (data: IFolder) => {
	const response = await axiosInstance.put(`/folder/${data.id}`, data);
	return response.data;
};

export const deleteFolder = async (data: IFolder) => {
	const response = await axiosInstance.delete(`/folder/${data.id}`);
	return response.data;
};
