'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class LactationData extends Model {
    static associate(models) {
      LactationData.belongsTo(models.Animal, {
        foreignKey: 'animalId',
        as: 'animal',
      });

      // Define association with HistoryItem
      LactationData.hasMany(models.YearlyData, {
        foreignKey: 'conditionId',
        constraints: false,
        scope: {
          conditionType: 'LactationData',
        },
        as: 'yearlyDatas',
      });
    }
  }
  LactationData.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    animalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'LactationData',
    tableName: 'LactationDatas',
  });
  return LactationData;
};