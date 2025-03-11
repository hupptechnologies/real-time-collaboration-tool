import axios, { AxiosError } from 'axios';
import { TErrorResponse } from '@/types';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (
	email: string,
	password: string,
	showToaster: (_message: string, _severity: 'success' | 'error') => void
) => {
	try {
		const response = await axios.post(`${API_URL}/auth/login`, {
			email,
			password
		});
		showToaster('Login successful!', 'success');
		return response;
	} catch (error) {
		const axiosError = error as AxiosError<TErrorResponse>;
		showToaster(axiosError.response?.data?.message || 'Login failed', 'error');
		throw error;
	}
};

export const signup = async (
	username: string,
	email: string,
	password: string,
	showToaster: (_message: string, _severity: 'success' | 'error') => void
) => {
	try {
		const response = await axios.post(`${API_URL}/auth/signup`, {
			username,
			email,
			password
		});
		return response;
	} catch (error) {
		const axiosError = error as AxiosError<TErrorResponse>;
		showToaster(axiosError.response?.data?.message || 'Login failed', 'error');
		throw error;
	}
};
