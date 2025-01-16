'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserFarms extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }
  UserFarms.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      farmId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Farms',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'UserFarms',
    }
  );
  return UserFarms;
};
