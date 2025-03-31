import axiosInstance from '@/utils/axios';
import { IUser } from '@/types';

export const getUser = async () => {
	const response = await axiosInstance.get('/user/detail');
	return response.data;
};

export const updateUser = async (data: IUser) => {
	const response = await axiosInstance.put('/user/update', data);
	return response.data;
};
