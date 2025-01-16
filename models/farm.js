'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Farm extends Model {
    static associate(models) {
      Farm.belongsTo(models.User, {
        foreignKey: 'ownerId',
        as: 'farm',
      });

      Farm.belongsToMany(models.User, {
        through: 'UserFarms',
        as: 'operators',
        foreignKey: 'farmId',
        otherKey: 'userId',
      });
    }
  }
  Farm.init({
    name: {
      type: DataTypes.STRING
    },
    category: {
      type: DataTypes.ENUM('CowFarm', 'GoatFarm', 'SheepFarm'),
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Farm',
  });
  return Farm;
};