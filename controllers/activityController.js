const { addActivity, getAllActivities } = require('../services/activityService');

const addActivityController = async (req, res) => {
  try {
    const { changes, ...activityData } = req.body;
    const activity = await addActivity(activityData, changes);
    res.status(201).json({
      success: true,
      data: activity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getAllActivitiesController = async (req, res) => {
  try {
    const activities = await getAllActivities(req.params.farmId);
    res.status(200).json({
      success: true,
      data: activities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  addActivityController,
  getAllActivitiesController,
};
