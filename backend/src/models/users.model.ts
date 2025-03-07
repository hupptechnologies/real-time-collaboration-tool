import { Table, Model, Column, DataType } from 'sequelize-typescript';
import { IUsers, TUsers } from '../interface';
@Table({
	timestamps: true,
	tableName: 'users',
	freezeTableName: true,
	schema: 'admin',
})
export default class Users extends Model<IUsers, TUsers> {
	@Column(DataType.STRING(1024))
	declare username: string;

	@Column(DataType.STRING(1024))
	declare email: string;

	@Column({
		type: DataType.ENUM,
		values: ['user', 'admin'],
		defaultValue: 'user',
	})
	declare role: string;

	@Column(DataType.STRING)
	declare password: string;

	@Column(DataType.BOOLEAN)
	declare isDeleted: boolean;
}
