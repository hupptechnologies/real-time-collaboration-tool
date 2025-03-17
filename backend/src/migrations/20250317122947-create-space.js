'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'spaces',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING(1024),
          allowNull: false
        },
        description: {
          type: Sequelize.TEXT,
        },
        ownerId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: 'users',
              schema: 'admin'
            },
            key: 'id'
          }
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
      }
    );
  },
	async down(queryInterface, _Sequelize) {
		await queryInterface.dropTable({
			tableName: 'spaces',
			schema: 'admin',
		});
	},
};
