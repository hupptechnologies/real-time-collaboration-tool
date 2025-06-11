import {
	Table,
	Model,
	Column,
	ForeignKey,
	HasMany,
	BelongsTo,
	DataType,
	Default,
} from 'sequelize-typescript';
import { IPage, TPage } from '../interface';
import Spaces from './spaces.model';
import Users from './users.model';
import Folder from './folder.model';

@Table({
	timestamps: true,
	tableName: 'pages',
	freezeTableName: true,
	schema: 'admin',
})
export default class Page extends Model<IPage, TPage> {
	@Column({
		type: DataType.STRING(255),
		allowNull: false,
	})
	declare title: string;

	@Column({
		type: DataType.TEXT,
		allowNull: false,
	})
	declare content: string;

	@Column({
		type: DataType.ENUM('draft', 'published', 'archived'),
		allowNull: false,
		defaultValue: 'draft',
	})
	declare status: 'draft' | 'published' | 'archived';

	@ForeignKey(() => Folder)
	@Default(null)
	@Column({
		type: DataType.INTEGER,
		allowNull: true,
	})
	declare folderId: number | null;

	@ForeignKey(() => Page)
	@Default(null)
	@Column({
		type: DataType.INTEGER,
		allowNull: true,
	})
	declare parentId: number | null;

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

	@HasMany(() => Page, {
		foreignKey: 'parentId',
		as: 'pages',
	})
	declare pages: Page[];

	@BelongsTo(() => Folder)
	declare folder: Folder;

	@BelongsTo(() => Spaces)
	declare space: Spaces;

	@BelongsTo(() => Users)
	declare user: Users;
}
