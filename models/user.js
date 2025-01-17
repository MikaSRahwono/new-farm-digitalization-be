'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing

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

    // Instance method to check password validity
    checkPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }
  }

  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    profile_url: DataTypes.STRING,
    role: DataTypes.STRING,
    last_time_online: {
      type: DataTypes.DATE,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        // Hash the password before saving it
        const hashedPassword = bcrypt.hashSync(value, 10);
        this.setDataValue('password', hashedPassword);
      },
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
  });

  return User;
};
