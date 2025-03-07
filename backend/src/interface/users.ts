import { CreationOptional, Optional } from 'sequelize';

export interface IUsers {
	readonly id?: CreationOptional<number>;
	username: string;
	email: string;
	role: string;
	password: string;
	isDeleted?: boolean;
	readonly createdAt?: Date;
	readonly updatedAt?: Date;
}

export type TUsers = Optional<
	IUsers,
	'username' | 'email' | 'password' | 'role' | 'id' | 'isDeleted'
>;
