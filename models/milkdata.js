'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MilkData extends Model {
    static associate(models) {
      MilkData.belongsTo(models.Animal, {
        foreignKey: 'animalId',
        as: 'animal',
      });

      // Define association with HistoryItem
      MilkData.hasMany(models.YearlyData, {
        foreignKey: 'conditionId',
        constraints: false,
        scope: {
          conditionType: 'MilkData',
        },
        as: 'yearlyDatas',
      });
    }
  }
  MilkData.init({
    animalId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MilkData',
    tableName: 'MilkDatas',
  });
  return MilkData;
};