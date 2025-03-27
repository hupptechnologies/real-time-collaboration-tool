import axiosInstance from '@/utils/axios';
import { ISpace } from '@/types';

export const getAllSpace = async () => {
	const response = await axiosInstance.get('/space/list');
	return response.data;
};

export const createSpace = async (data: ISpace) => {
	const response = await axiosInstance.post('/space/create', data);
	return response.data;
};

export const updateSpace = async (data: ISpace) => {
	const response = await axiosInstance.put(`/space/${data.id}`, data);
	return response.data;
};

export const deleteSpace = async (data: ISpace) => {
	const response = await axiosInstance.delete(`/space/${data.id}`);
	return response.data;
};
