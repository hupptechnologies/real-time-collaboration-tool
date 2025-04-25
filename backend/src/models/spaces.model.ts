import {
	Table,
	Model,
	Column,
	DataType,
	ForeignKey,
	BelongsTo,
	HasMany,
} from 'sequelize-typescript';
import { ISpace, TSpace } from '../interface';
import Users from './users.model';
import Folder from './folder.model';

@Table({
	timestamps: true,
	tableName: 'spaces',
	freezeTableName: true,
	schema: 'admin',
})
export default class Spaces extends Model<ISpace, TSpace> {
	@Column(DataType.STRING(1024))
	declare name: string;

	@Column(DataType.STRING(1024))
	declare description: string;

	@ForeignKey(() => Users)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	declare ownerId: number;

	@BelongsTo(() => Users)
	declare owner: Users;

	@HasMany(() => Folder, {
		foreignKey: 'spaceId',
		as: 'folders',
	})
	declare folders: Folder;
}
