'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vitamin extends Model {
    static associate(models) {
      Vitamin.belongsTo(models.Animal, {
        foreignKey: 'animalId',
        as: 'animal',
      });

      // Define association with HistoryItem
      Vitamin.hasMany(models.HistoryItem, {
        foreignKey: 'conditionId',
        constraints: false,
        scope: {
          conditionType: 'Vitamin',
        },
        as: 'historyItems',
      });
    }
  }
  Vitamin.init({
    current_condition: DataTypes.STRING,
    animalId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Vitamin',
    tableName: 'Vitamins',
  });
  return Vitamin;
};