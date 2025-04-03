import { CreationOptional, Optional } from 'sequelize';
export interface IFolder {
	readonly id: CreationOptional<number>;
	name: string;
	description: string;
	parentFolderId: number | null;
	spaceId: number;
	userId: number;
	readonly createdAt?: Date;
	readonly updatedAt?: Date;
}
export type TFloder = Optional<
	IFolder,
	'name' | 'description' | 'parentFolderId' | 'spaceId' | 'userId'
>;
