'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MonthlyDatas', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      month: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      value: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      yearlyDataId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'YearlyDatas', // Ensure this matches the name of the YearlyDatas table
          key: 'id',
        },
        onDelete: 'CASCADE', // If a yearly data entry is deleted, delete associated monthly data
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('MonthlyDatas');
  },
};