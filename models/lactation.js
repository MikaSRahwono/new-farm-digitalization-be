'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Lactation extends Model {
    static associate(models) {
      Lactation.belongsTo(models.Animal, {
        foreignKey: 'animalId',
        as: 'animal',
      });

      Lactation.belongsTo(models.Animal, {
        foreignKey: 'spouseId',
        as: 'spouse',
      });

      Lactation.hasMany(models.LactationChild, {
        foreignKey: 'lactationId',
        constraints: false,
        as: 'lactationChilds',
      });
    }
  }

  Lactation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      animalId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      spouseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      lactation_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dob: {
        type: DataTypes.DATE,
      },
      total_child: {
        type: DataTypes.INTEGER,
      },
      total_male_child: {
        type: DataTypes.INTEGER,
      },
      total_female_child: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Lactation',
      tableName: 'Lactations',
      timestamps: true,
    }
  );

  return Lactation;
};
