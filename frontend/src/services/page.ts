import { IPage, IPageCreationAttribute } from '@/types';
import axiosInstance from '@/utils/axios';

export const createPage = async (data: IPageCreationAttribute) => {
	const response = await axiosInstance.post('/page/new', data);
	return response.data;
};

export const getPage = async (data: Partial<IPage>) => {
	const response = await axiosInstance.get(`/page/${data.id}`);
	return response.data;
};

export const updatePage = async (data: Partial<IPage>) => {
	const response = await axiosInstance.put(`/page/${data.id}`, data);
	return response.data;
};
