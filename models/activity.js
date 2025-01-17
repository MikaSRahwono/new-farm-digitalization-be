'use strict';
module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    farmId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});

  Activity.associate = function(models) {
    // Activity belongs to a Farm
    Activity.belongsTo(models.Farm, {
      foreignKey: 'farmId',
      as: 'farm',
    });
    
    // Activity has many changes (through ActivityChanges)
    Activity.hasMany(models.ActivityChange, {
      foreignKey: 'activityId',
      as: 'changes',
    });
  };

  return Activity;
};
