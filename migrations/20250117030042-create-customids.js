'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LivestockCustomIds', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      farm_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Farms',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      type_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      custom_prefix: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      last_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('LivestockCustomIds');
  },
};
