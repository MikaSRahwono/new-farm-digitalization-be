'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MilkProduction extends Model {
    static associate(models) {
      MilkProduction.belongsTo(models.Animal, {
        foreignKey: 'animalId',
        as: 'animal',
      });
    }
  }

  MilkProduction.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        dateOfProduction: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        animalId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
      sequelize,
      modelName: 'MilkProduction',
      tableName: 'MilkProductions',
      timestamps: false,
    }
  );

  return MilkProduction;
};
