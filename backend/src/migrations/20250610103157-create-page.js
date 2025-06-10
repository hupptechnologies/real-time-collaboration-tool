'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('draft', 'published', 'archived'),
        allowNull: false,
        defaultValue: 'draft'
      },
      parentId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
          model: {
            tableName: 'pages',
            schema: 'admin'
          },
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      folderId: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
        allowNull: false,
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
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },{
      schema: 'admin',
      freezeTableName: true,
      timestamps: true
    });

    await queryInterface.addIndex(
      { schema: 'admin', tableName: 'pages' },
      ['spaceId'],
      { schema: 'admin' }
    );
    await queryInterface.addIndex(
      { schema: 'admin', tableName: 'pages' },
      ['parentId'],
      { schema: 'admin' }
    );
    await queryInterface.addIndex(
      { schema: 'admin', tableName: 'pages' },
      ['folderId'],
      { schema: 'admin' }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex(
      { schema: 'admin', tableName: 'pages' },
      ['folderId']
    );
    await queryInterface.removeIndex(
      { schema: 'admin', tableName: 'pages' },
      ['spaceId']
    );
    await queryInterface.removeIndex(
      { schema: 'admin', tableName: 'pages' },
      ['parentId']
    );
    
    await queryInterface.dropTable({
      tableName: 'pages',
      schema: 'admin'
    });

    await queryInterface.sequelize.query(
      `DROP TYPE IF EXISTS admin."enum_pages_status";`
    );
  }
};