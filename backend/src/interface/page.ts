import { CreationOptional, Optional } from 'sequelize';

export type PageStatus = 'draft' | 'published' | 'archived';

export interface IPage {
	readonly id?: CreationOptional<number>;
	title: string;
	content: string;
	status: PageStatus;
	parentId?: number | null;
	folderId?: number | null;
	spaceId: number;
	userId: number;
	readonly createdAt?: Date;
	updatedAt?: Date;
}

export type TPage = Optional<IPage, 'id' | 'createdAt'>;
