'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Animals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name_id: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      dob: {
        type: Sequelize.DATE
      },
      weight: {
        type: Sequelize.STRING
      },
      phase: {
        type: Sequelize.STRING
      },
      photo_url: {
        type: Sequelize.STRING
      },
      breed: {
        type: Sequelize.STRING
      },
      type_id: {
        type: Sequelize.STRING
      },
      farm_name: {
        type: Sequelize.STRING
      },
      farmId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Farms',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      dad_name_id: {
        type: Sequelize.STRING
      },
      mom_name_id: {
        type: Sequelize.STRING
      },
      grandpa_name_id: {
        type: Sequelize.STRING
      },
      grandma_name_id: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Animals');
  }
};