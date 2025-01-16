'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');

module.exports = (sequelize) => {
  class Health extends Model {
    static associate(models) {
      Health.belongsTo(models.Animal, {
        foreignKey: 'animalId',
        as: 'animal',
      });

      Health.hasMany(models.HistoryItem, {
        foreignKey: 'conditionId',
        constraints: false,
        scope: {
          conditionType: 'Health',
        },
        as: 'historyItems',
      });
    }
  }

  Health.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    current_condition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    animalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Health',
    tableName: 'Healths',
    timestamps: true,
  });

  return Health;
};