import { CreationOptional, Optional } from 'sequelize';

export interface ISpace {
	readonly id?: CreationOptional<number>;
	name: string;
	description?: string;
	ownerId: number;
	readonly createdAt?: Date;
	readonly updatedAt?: Date;
}

export type TSpace = Optional<
	ISpace,
	'name' | 'description' | 'ownerId' | 'id'
>;
