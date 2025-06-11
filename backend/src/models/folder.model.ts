import {
	Table,
	Model,
	Column,
	ForeignKey,
	Unique,
	HasMany,
	BelongsTo,
	DataType,
} from 'sequelize-typescript';
import { IFolder, TFloder } from '../interface';
import Spaces from './spaces.model';
import Users from './users.model';
import Page from './page.model';

@Table({
	timestamps: true,
	tableName: 'folders',
	freezeTableName: true,
	schema: 'admin',
})
export default class Folder extends Model<IFolder, TFloder> {
	@Unique
	@Column({
		type: DataType.STRING(255),
		allowNull: false,
	})
	declare name: string;

	@Column({
		type: DataType.STRING(1024),
		allowNull: true,
	})
	declare description: string;

	@ForeignKey(() => Folder)
	@Column({
		type: DataType.INTEGER,
		allowNull: true,
	})
	declare parentFolderId: number | null;

	@ForeignKey(() => Spaces)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	declare spaceId: number;

	@ForeignKey(() => Users)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	declare userId: number;

	@HasMany(() => Folder)
	declare childFolder: Folder[];

	@BelongsTo(() => Spaces, {
		foreignKey: 'spaceId',
		as: 'spaces',
	})
	declare spaces: Spaces;

	@BelongsTo(() => Users)
	declare user: Users;

	@HasMany(() => Page, {
		foreignKey: 'folderId',
		as: 'pages',
	})
	declare pages: Page[];
}
