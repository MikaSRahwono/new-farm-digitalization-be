'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vaccine extends Model {
    static associate(models) {
      Vaccine.belongsTo(models.Animal, {
        foreignKey: 'animalId',
        as: 'animal',
      });

      // Define association with HistoryItem
      Vaccine.hasMany(models.HistoryItem, {
        foreignKey: 'conditionId',
        constraints: false,
        scope: {
          conditionType: 'Vaccine',
        },
        as: 'historyItems',
      });
    }
  }
  Vaccine.init({
    current_condition: DataTypes.STRING,
    animalId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Vaccine',
    tableName: 'Vaccines',
  });
  return Vaccine;
};