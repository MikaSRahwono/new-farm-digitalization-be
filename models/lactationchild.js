'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class LactationChild extends Model {
    static associate(models) {
      LactationChild.belongsTo(models.Lactation, {
        foreignKey: 'lactationId',
        as: 'lactation',
      });
    }
  }

  LactationChild.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      lactationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'LactationChild',
      tableName: 'LactationChilds',
      timestamps: true,
    }
  );

  return LactationChild;
};
