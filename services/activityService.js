const { Activity, ActivityChange } = require('../models');

/**
 * Create a new activity and associate changes
 * @param {Object} activityData - The activity details
 * @param {Array} changes - List of changes related to the activity
 * @returns {Promise<Object>} - The created activity along with associated changes
 */
const addActivity = async (activityData, changes) => {
  const activity = await Activity.create(activityData);

  const changesData = changes.map(change => ({
    ...change,
    activityId: activity.id,
  }));

  await ActivityChange.bulkCreate(changesData);

  return activity;
};

/**
 * Get all activities for a specific farm, including their changes
 * @param {Number} farmId - The ID of the farm
 * @returns {Promise<Array>} - List of activities with associated changes
 */
const getAllActivities = async (farmId) => {
  const activities = await Activity.findAll({
    where: { farmId },
    include: [{
      model: ActivityChange,
      as: 'changes',
    }],
  });

  return activities;
};

module.exports = {
  addActivity,
  getAllActivities,
};
