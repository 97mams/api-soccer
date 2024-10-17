'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const query = await queryInterface.createTable('TeamGroups', {
      teamId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Teams',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      groupTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'group_types',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }  // Pour faire de la combinaison de teamId et groupTypeId une clé primaire
    });

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TeamGroups');
  },
};
