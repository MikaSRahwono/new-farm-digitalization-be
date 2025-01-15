// services/vitaminService.js
const { Vitamin, HistoryItem } = require('../models');

/**
 * Create a new Vitamin record
 * @param {String} animalId
 * @param {Object} vitaminData
 * @returns {Promise<Vitamin>}
 */
const createVitamin = async (animalId, vitaminData) => {
  const vitamin = await Vitamin.create({
    animalId,
    current_condition: vitaminData.current_condition,
  });

  if (vitaminData.history_items && Array.isArray(vitaminData.history_items)) {
    const historyItems = vitaminData.history_items.map(item => ({
      title: item.title,
      value: item.value,
      conditionType: 'Vitamin',
      conditionId: vitamin.id,
    }));
    await HistoryItem.bulkCreate(historyItems);
  }

  return vitamin;
};

/**
 * Get Vitamin by Animal ID
 * @param {String} animalId
 * @returns {Promise<Vitamin>}
 */
const getVitaminByAnimalId = async (animalId) => {
  return await Vitamin.findOne({
    where: { animalId },
    include: [{
      model: HistoryItem,
      as: 'historyItems',
      where: { conditionType: 'Vitamin' },
      required: false,
    }],
  });
};

/**
 * Update Vitamin
 * @param {Integer} id
 * @param {Object} updateData
 * @returns {Promise<Vitamin>}
 */
const updateVitamin = async (id, updateData) => {
  const vitamin = await Vitamin.findByPk(id);
  if (!vitamin) return null;

  await vitamin.update({
    current_condition: updateData.current_condition || vitamin.current_condition,
  });

  if (updateData.history_items && Array.isArray(updateData.history_items)) {
    // Optionally, you can delete existing history items and recreate them
    await HistoryItem.destroy({ where: { conditionId: id, conditionType: 'Vitamin' } });
    const historyItems = updateData.history_items.map(item => ({
      title: item.title,
      value: item.value,
      conditionType: 'Vitamin',
      conditionId: vitamin.id,
    }));
    await HistoryItem.bulkCreate(historyItems);
  }

  return vitamin;
};

/**
 * Delete Vitamin
 * @param {Integer} id
 * @returns {Promise<Boolean>}
 */
const deleteVitamin = async (id) => {
  const result = await Vitamin.destroy({ where: { id } });
  return result > 0;
};

module.exports = {
  createVitamin,
  getVitaminByAnimalId,
  updateVitamin,
  deleteVitamin,
};