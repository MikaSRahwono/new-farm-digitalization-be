'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Weight extends Model {
    static associate(models) {
      Weight.belongsTo(models.Animal, {
        foreignKey: 'animalId',
        as: 'animal',
      });
    }
  }

  Weight.init(
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
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      mass: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Weight',
      tableName: 'Weights',
      timestamps: true,
    }
  );

  return Weight;
};
