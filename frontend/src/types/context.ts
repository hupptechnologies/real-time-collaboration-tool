import { AlertColor } from '@mui/material';

export type TThemeContextType = {
	mode: 'light' | 'dark';
	toggleThemeMode: () => void;
};

export type TAuthContextType = {
	user: string | null;
	login: (_email: string, _password: string) => Promise<void>;
	logout: () => void;
};

export type ToasterContextType = {
	showToaster: (_message: string, _severity: AlertColor) => void;
};
