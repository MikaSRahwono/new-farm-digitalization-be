'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class LivestockCustomId extends Model {
    static associate(models) {
      LivestockCustomId.belongsTo(models.Farm, {
        foreignKey: 'farm_id',
        as: 'farm',
        onDelete: 'CASCADE',
      });
    }
  }

  LivestockCustomId.init(
    {
      farm_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      custom_prefix: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      last_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'LivestockCustomId',
      tableName: 'LivestockCustomIds',
      timestamps: false,
    }
  );

  return LivestockCustomId;
};
