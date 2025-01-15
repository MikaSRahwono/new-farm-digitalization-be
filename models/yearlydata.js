'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class YearlyData extends Model {
    static associate(models) {
      YearlyData.belongsTo(models.LactationData, {
        foreignKey: 'conditionId',
        constraints: false,
        as: 'lactationData',
      });
      YearlyData.belongsTo(models.MilkData, {
        foreignKey: 'conditionId',
        constraints: false,
        as: 'milkData',
      });
      YearlyData.belongsTo(models.WeightData, {
        foreignKey: 'conditionId',
        constraints: false,
        as: 'weightData',
      });
      YearlyData.hasMany(models.MonthlyData, {
        foreignKey: 'yearlyDataId',
        constraints: false,
        as: 'monthlyDatas',
      });
    }
  }

  YearlyData.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    conditionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    conditionType: {
      type: DataTypes.ENUM('LactationData', 'WeightData', 'MilkData'),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'YearlyData',
    tableName: 'YearlyDatas',
  });

  return YearlyData;
};
