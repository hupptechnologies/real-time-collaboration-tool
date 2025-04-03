'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('folders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(1024),
        unique: true,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
      },
      parentFolderId: {
        type: Sequelize.INTEGER,
        defaultValue: null,
        references: {
          model: {
            tableName: 'folders',
            schema: 'admin'
          },
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      spaceId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'spaces',
            schema: 'admin'
          },
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      userId: {
        type: Sequelize.INTEGER,
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
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      schema: 'admin',
      freezeTableName: true,
      timestamps: true
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable({
      tableName: 'folders',
      schema: 'admin'
    });
  }
};