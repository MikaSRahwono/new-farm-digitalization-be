'use strict';
module.exports = (sequelize, DataTypes) => {
  const ActivityChange = sequelize.define('ActivityChange', {
    what: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    from: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    to: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    activityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});

  ActivityChange.associate = function(models) {
    // ActivityChange belongs to an Activity
    ActivityChange.belongsTo(models.Activity, {
      foreignKey: 'activityId',
      as: 'activity',
    });
  };

  return ActivityChange;
};
