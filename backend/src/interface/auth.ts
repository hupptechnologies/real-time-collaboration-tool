import { Optional } from 'sequelize';
import { File } from 'node:buffer';

declare module 'fastify' {
	interface FastifyRequest {
		user: any;
		file?: File;
		files?: File[];
	}
}
export interface ITokenDetail {
	id: number;
	role: string;
	email: string;
}
export type TTokenDetail = Optional<ITokenDetail, 'id' | 'role' | 'email'>;
