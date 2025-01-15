// services/vaccineService.js
const { Vaccine, HistoryItem } = require('../models');

/**
 * Create a new Vaccine record
 * @param {String} animalId
 * @param {Object} vaccineData
 * @returns {Promise<Vaccine>}
 */
const createVaccine = async (animalId, vaccineData) => {
  const vaccine = await Vaccine.create({
    animalId,
    current_condition: vaccineData.current_condition,
  });

  if (vaccineData.history_items && Array.isArray(vaccineData.history_items)) {
    const historyItems = vaccineData.history_items.map(item => ({
      title: item.title,
      value: item.value,
      conditionType: 'Vaccine',
      conditionId: vaccine.id,
    }));
    await HistoryItem.bulkCreate(historyItems);
  }

  return vaccine;
};

/**
 * Get Vaccine by Animal ID
 * @param {String} animalId
 * @returns {Promise<Vaccine>}
 */
const getVaccineByAnimalId = async (animalId) => {
  return await Vaccine.findOne({
    where: { animalId },
    include: [{
      model: HistoryItem,
      as: 'historyItems',
      where: { conditionType: 'Vaccine' },
      required: false,
    }],
  });
};

/**
 * Update Vaccine
 * @param {Integer} id
 * @param {Object} updateData
 * @returns {Promise<Vaccine>}
 */
const updateVaccine = async (id, updateData) => {
  const vaccine = await Vaccine.findByPk(id);
  if (!vaccine) return null;

  await vaccine.update({
    current_condition: updateData.current_condition || vaccine.current_condition,
  });

  if (updateData.history_items && Array.isArray(updateData.history_items)) {
    // Optionally, you can delete existing history items and recreate them
    await HistoryItem.destroy({ where: { conditionId: id, conditionType: 'Vaccine' } });
    const historyItems = updateData.history_items.map(item => ({
      title: item.title,
      value: item.value,
      conditionType: 'Vaccine',
      conditionId: vaccine.id,
    }));
    await HistoryItem.bulkCreate(historyItems);
  }

  return vaccine;
};

/**
 * Delete Vaccine
 * @param {Integer} id
 * @returns {Promise<Boolean>}
 */
const deleteVaccine = async (id) => {
  const result = await Vaccine.destroy({ where: { id } });
  return result > 0;
};

module.exports = {
  createVaccine,
  getVaccineByAnimalId,
  updateVaccine,
  deleteVaccine,
};