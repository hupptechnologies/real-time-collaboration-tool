export type TComponent = {
	children: React.ReactNode;
};

export type TThemeContextType = {
	mode: 'light' | 'dark';
	toggleThemeMode: () => void;
};
