export type TComponent = {
	children: React.ReactNode;
};

export type TThemeContextType = {
	mode: 'light' | 'dark';
	toggleThemeMode: () => void;
};

export type TAuthContextType = {
	user: string | null;
	// eslint-disable-next-line no-unused-vars
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
};
