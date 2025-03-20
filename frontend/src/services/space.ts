import axiosInstance from '@/utils/axios';

export const getAllSpace = async () => {
	const response = await axiosInstance.get('/space/list');
	return response.data;
};
