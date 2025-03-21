import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		'Content-Type': 'application/json'
	},
	timeout: 60000
});

axiosInstance.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
	(response: AxiosResponse) => response,
	(error) => {
		return Promise.reject(error);
	}
);

export default axiosInstance;
