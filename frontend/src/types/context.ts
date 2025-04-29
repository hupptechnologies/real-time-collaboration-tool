import { AlertColor } from '@mui/material';
import { TUser } from './common';

export type TThemeContextType = {
	mode: 'light' | 'dark';
	toggleThemeMode: () => void;
};

export type TAuthContextType = {
	isAuthenticated: boolean;
	isLoading: boolean;
	user: TUser | null;
	login: (_email: string, _password: string) => Promise<void>;
	logout: () => void;
};

export type TToasterContextType = {
	showToaster: (_message: string, _severity: AlertColor) => void;
};
