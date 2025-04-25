import {
	Table,
	Model,
	Column,
	ForeignKey,
	Default,
	Unique,
	HasMany,
	BelongsTo,
} from 'sequelize-typescript';
import { IFolder, TFloder } from '../interface';
import Spaces from './spaces.model';
import Users from './users.model';

@Table({
	timestamps: true,
	tableName: 'folders',
	freezeTableName: true,
	schema: 'admin',
})
export default class Folder extends Model<IFolder, TFloder> {
	@Unique
	@Column
	declare name: string;

	@Column
	declare description: string;

	@ForeignKey(() => Folder)
	@Default(null)
	@Column
	declare parentFolderId: number;

	@ForeignKey(() => Spaces)
	@Column
	declare spaceId: number;

	@ForeignKey(() => Users)
	@Column
	declare userId: number;

	@HasMany(() => Folder)
	declare childFolder: Folder;

	@BelongsTo(() => Spaces, {
		foreignKey: 'spaceId',
		as: 'spaces',
	})
	declare spaces: Spaces;
}
