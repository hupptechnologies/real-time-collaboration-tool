export interface IUser {
	id?: number;
	username?: string;
	email?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface IUserState {
	user: IUser;
	loading: boolean;
	error: string | null;
}
