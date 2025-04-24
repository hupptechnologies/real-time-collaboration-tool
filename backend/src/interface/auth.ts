import { Optional } from 'sequelize';
import { File } from 'node:buffer';
import { IUsers } from './users';

declare module 'fastify' {
	interface FastifyRequest {
		user: Partial<IUsers>;
		file?: File;
		files?: File[];
	}
}
export interface ITokenDetail {
	id: number;
	username: string;
	role: string;
	email: string;
}
export type TTokenDetail = Optional<
	ITokenDetail,
	'id' | 'role' | 'email' | 'username'
>;
