'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FarmRequest extends Model {
    /**
     * Define associations for the FarmRequest model.
     */
    static associate(models) {
      FarmRequest.belongsTo(models.Farm, {
        foreignKey: 'farmId',
        as: 'farm',
      });

      FarmRequest.belongsTo(models.User, {
        foreignKey: 'operatorId',
        as: 'operator',
      });
    }
  }

  FarmRequest.init(
    {
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'PENDING', // Default status for new requests
      },
      farmId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      operatorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: 'FarmRequest',
      tableName: 'FarmRequests',
    }
  );

  return FarmRequest;
};
