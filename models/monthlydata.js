'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MonthlyData extends Model {
    static associate(models) {
      MonthlyData.belongsTo(models.YearlyData, {
        foreignKey: 'yearlyDataId',
        constraints: false,
        as: 'monthlyDatas',
      });
    }
  }
  MonthlyData.init({
    month: DataTypes.STRING,
    value: DataTypes.INTEGER,
    yearlyDataId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MonthlyData',
    tableName: 'MonthlyDatas',
  });
  return MonthlyData;
};