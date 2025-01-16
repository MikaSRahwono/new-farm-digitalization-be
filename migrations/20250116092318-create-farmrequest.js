module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('FarmRequests', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      status: {
        type: Sequelize.ENUM('PENDING', 'ACCEPTED', 'REJECTED'),
        defaultValue: 'PENDING',
      },
      operatorId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('FarmRequests');
  },
};
