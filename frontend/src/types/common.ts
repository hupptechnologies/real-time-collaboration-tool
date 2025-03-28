export type TProps = {
	children: React.ReactNode;
};

export type TErrorResponse = {
	message: string;
};

export type TUser = {
	id: number;
	username: string;
	email: string;
	role: string;
	createdAt?: Date;
	updatedAt?: Date;
};

export interface IAuthState {
	isLoggedIn: boolean;
	token: string;
}

export interface IErrorState {
	isOpen: boolean;
	message: string;
	type: string;
}

export interface LoadingIndicatorProps {
	loader?: boolean;
}

export interface IModalProps {
	open: boolean;
	onClose: () => void;
	title?: string;
	content: React.ReactNode;
	showCloseButton?: boolean;
}

export interface IConfirmModalProps {
	open: boolean;
	title?: string;
	subTitle: string;
	onClose: (_confirmed: boolean) => void;
}
