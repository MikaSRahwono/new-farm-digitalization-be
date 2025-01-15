'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medication extends Model {
    static associate(models) {
      Medication.belongsTo(models.Animal, {
        foreignKey: 'animalId',
        as: 'animal',
      });

      // Define association with HistoryItem
      Medication.hasMany(models.HistoryItem, {
        foreignKey: 'conditionId',
        constraints: false,
        scope: {
          conditionType: 'Medication',
        },
        as: 'historyItems',
      });
    }
  }
  Medication.init({
    current_condition: DataTypes.STRING,
    animalId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Medication',
    tableName: 'Medications',
  });
  return Medication;
};