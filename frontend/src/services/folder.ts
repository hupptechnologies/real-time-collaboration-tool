import axiosInstance from '@/utils/axios';
import { IFolder, IFolderCreationAttribute } from '@/types';

export const createFolder = async (data: IFolderCreationAttribute) => {
	const response = await axiosInstance.post('/folder/new', data);
	return response.data;
};

export const updateFolder = async (data: Partial<IFolder>) => {
	const response = await axiosInstance.put(`/folder/${data.id}`, data);
	return response.data;
};

export const deleteFolder = async (data: IFolder) => {
	const response = await axiosInstance.delete(`/folder/${data.id}`);
	return response.data;
};
