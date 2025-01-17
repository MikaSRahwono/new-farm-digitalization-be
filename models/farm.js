'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Farm extends Model {
    static associate(models) {
      Farm.belongsTo(models.User, {
        foreignKey: 'ownerId',
        as: 'owner',
      });

      Farm.belongsToMany(models.User, {
        through: 'UserFarms',
        as: 'operators',
        foreignKey: 'farmId',
        otherKey: 'userId',
      });
      Farm.hasMany(models.Animal, {
        foreignKey: 'farmId',
        constraints: false,
        scope: {
          conditionType: 'Animal',
        },
        as: 'animals',
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
    tableName: 'Farms',
  });
  return Farm;
};