'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Lactations', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      animalId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Animals',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      spouseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Animals',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      lactation_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      dob: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      total_child: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      total_male_child: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      total_female_child: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Lactations');
  },
};
