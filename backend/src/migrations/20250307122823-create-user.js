'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createSchema('admin', { ifNotExists: true }),
			await queryInterface.createTable(
				'users',
				{
					id: {
						allowNull: false,
						autoIncrement: true,
						primaryKey: true,
						type: Sequelize.INTEGER,
					},
					username: {
						type: Sequelize.STRING(1024),
						allowNull: false,
					},
					email: {
						type: Sequelize.STRING(1024),
						unique: true,
						allowNull: false,
					},
					role: {
						type: Sequelize.ENUM,
						values: ['user', 'admin'],
						defaultValue: 'user',
						allowNull: false,
					},
					password: {
						type: Sequelize.STRING,
						allowNull: false,
					},
					isDeleted: {
						type: Sequelize.BOOLEAN,
						defaultValue: false,
					},
					createdAt: {
						allowNull: false,
						type: Sequelize.DATE,
					},
					updatedAt: {
						allowNull: false,
						type: Sequelize.DATE,
					},
				},
				{
					schema: 'admin',
					freezeTableName: true,
					timestamps: true,
				},
			);
	},
	async down(queryInterface, _Sequelize) {
		await queryInterface.dropTable({
			tableName: 'users',
			schema: 'admin',
		});
	},
};
