import { IPageCreationAttribute } from '@/types';
import axiosInstance from '@/utils/axios';

export const createPage = async (data: IPageCreationAttribute) => {
	const response = await axiosInstance.post('/page/new', data);
	return response.data;
};
