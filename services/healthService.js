// services/healthService.js
const { Health, HistoryItem } = require('../models');

/**
 * Create a new Health record
 * @param {String} animalId
 * @param {Object} healthData
 * @returns {Promise<Health>}
 */
const createHealth = async (animalId, healthData) => {
  const health = await Health.create({
    animalId,
    current_condition: healthData.current_condition,
  });

  if (healthData.history_items && Array.isArray(healthData.history_items)) {
    const historyItems = healthData.history_items.map(item => ({
      title: item.title,
      value: item.value,
      conditionType: 'Health',
      conditionId: health.id,
    }));
    await HistoryItem.bulkCreate(historyItems);
  }

  return health;
};

/**
 * Get Health by Animal ID
 * @param {String} animalId
 * @returns {Promise<Health>}
 */
const getHealthByAnimalId = async (animalId) => {
  return await Health.findOne({
    where: { animalId },
    include: [{
      model: HistoryItem,
      as: 'historyItems',
      where: { conditionType: 'Health' },
      required: false,
    }],
  });
};

/**
 * Update Health
 * @param {Integer} id
 * @param {Object} updateData
 * @returns {Promise<Health>}
 */
const updateHealth = async (id, updateData) => {
  const health = await Health.findByPk(id);
  if (!health) return null;

  await health.update({
    current_condition: updateData.current_condition || health.current_condition,
  });

  if (updateData.history_items && Array.isArray(updateData.history_items)) {
    // Optionally, you can delete existing history items and recreate them
    await HistoryItem.destroy({ where: { conditionId: id, conditionType: 'Health' } });
    const historyItems = updateData.history_items.map(item => ({
      title: item.title,
      value: item.value,
      conditionType: 'Health',
      conditionId: health.id,
    }));
    await HistoryItem.bulkCreate(historyItems);
  }

  return health;
};

/**
 * Delete Health
 * @param {Integer} id
 * @returns {Promise<Boolean>}
 */
const deleteHealth = async (id) => {
  const result = await Health.destroy({ where: { id } });
  return result > 0;
};

module.exports = {
  createHealth,
  getHealthByAnimalId,
  updateHealth,
  deleteHealth,
};