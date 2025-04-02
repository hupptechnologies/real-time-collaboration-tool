import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const refreshAccessToken = async () => {
	const refreshToken = localStorage.getItem('refreshToken');
	const API_URL = process.env.NEXT_PUBLIC_API_URL;
	try {
		const response = await axios.get(`${API_URL}/auth/refresh-token`, {
			headers: {
				Authorization: `Bearer ${refreshToken}`
			}
		});
		localStorage.setItem('token', response.headers?.token);
		return response.headers?.token;
	} catch (error: any) {
		localStorage.removeItem('token');
		localStorage.removeItem('refreshToken');
		window.location.href = '/login';
		throw error;
	}
};

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
	async (error) => {
		const originalRequest = error.config;
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			try {
				await refreshAccessToken();
				return axiosInstance(originalRequest);
			} catch (refreshError) {
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
