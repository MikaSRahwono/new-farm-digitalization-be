'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');

module.exports = (sequelize) => {
  class HistoryItem extends Model {
    static associate(models) {
      // Define associations with Health, Medication, Vitamin, and Vaccine
      HistoryItem.belongsTo(models.Health, {
        foreignKey: 'conditionId',
        constraints: false,
        as: 'health',
      });
      HistoryItem.belongsTo(models.Medication, {
        foreignKey: 'conditionId',
        constraints: false,
        as: 'medication',
      });
      HistoryItem.belongsTo(models.Vitamin, {
        foreignKey: 'conditionId',
        constraints: false,
        as: 'vitamin',
      });
      HistoryItem.belongsTo(models.Vaccine, {
        foreignKey: 'conditionId',
        constraints: false,
        as: 'vaccine',
      });
    }
  }

  HistoryItem.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    conditionType: {
      type: DataTypes.ENUM('Health', 'Medication', 'Vitamin', 'Vaccine'),
      allowNull: false,
    },
    conditionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'HistoryItem',
    tableName: 'HistoryItems',
    timestamps: true,
  });

  return HistoryItem;
};