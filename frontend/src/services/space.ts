import axiosInstance from '@/utils/axios';

export const getAllSpace = async () => {
	const response = await axiosInstance.get('/space/list');
	return response.data;
};

export const createSpace = async (data: any) => {
	const response = await axiosInstance.post('/space/create', data);
	return response.data;
};
