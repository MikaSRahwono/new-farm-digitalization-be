'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WeightData extends Model {
    static associate(models) {
      WeightData.belongsTo(models.Animal, {
        foreignKey: 'animalId',
        as: 'animal',
      });

      // Define association with HistoryItem
      WeightData.hasMany(models.YearlyData, {
        foreignKey: 'conditionId',
        constraints: false,
        scope: {
          conditionType: 'WeightData',
        },
        as: 'yearlyDatas',
      });
    }
  }
  WeightData.init({
    animalId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'WeightData',
    tableName: 'WeightDatas',
  });
  return WeightData;
};