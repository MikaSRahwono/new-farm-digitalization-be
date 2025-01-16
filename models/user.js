'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Farm, {
        foreignKey: 'ownerId',
        as: 'ownedFarms',
      });

      User.belongsToMany(models.Farm, {
        through: 'UserFarms',
        as: 'operatedFarms',
        foreignKey: 'userId',
        otherKey: 'farmId',
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    profile_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};