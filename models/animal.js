'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Animal extends Model {
    static associate(models) {
      Animal.hasOne(models.Health, {
        foreignKey: 'animalId',
        as: 'health',
      });
      Animal.hasOne(models.Medication, {
        foreignKey: 'animalId',
        as: 'medication',
      });
      Animal.hasOne(models.Vaccine, {
        foreignKey: 'animalId',
        as: 'vaccine',
      });
      Animal.hasOne(models.Vitamin, {
        foreignKey: 'animalId',
        as: 'vitamin',
      });
      Animal.hasOne(models.LactationData, {
        foreignKey: 'animalId',
        as: 'lactationData',
      });
      Animal.hasOne(models.WeightData, {
        foreignKey: 'animalId',
        as: 'weightData',
      });
      Animal.hasOne(models.MilkData, {
        foreignKey: 'animalId',
        as: 'milkData',
      });
    }
  }
  Animal.init({
    name_id: DataTypes.STRING,
    gender: DataTypes.STRING,
    dob: DataTypes.DATE,
    weight: DataTypes.STRING,
    phase: DataTypes.STRING,
    photo_url: DataTypes.STRING,
    breed: DataTypes.STRING,
    type_id: DataTypes.STRING,
    farm_name: DataTypes.STRING,
    dad_name_id: DataTypes.STRING,
    mom_name_id: DataTypes.STRING,
    grandpa_name_id: DataTypes.STRING,
    grandma_name_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Animal',
    tableName: 'Animals',
  });
  return Animal;
};