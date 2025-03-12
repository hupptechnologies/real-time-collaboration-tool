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
