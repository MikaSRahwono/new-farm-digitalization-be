// services/medicationService.js
const { Medication, HistoryItem } = require('../models');

/**
 * Create a new Medication record
 * @param {String} animalId
 * @param {Object} medicationData
 * @returns {Promise<Medication>}
 */
const createMedication = async (animalId, medicationData) => {
  const medication = await Medication.create({
    animalId,
    current_condition: medicationData.current_condition,
  });

  if (medicationData.history_items && Array.isArray(medicationData.history_items)) {
    const historyItems = medicationData.history_items.map(item => ({
      title: item.title,
      value: item.value,
      conditionType: 'Medication',
      conditionId: medication.id,
    }));
    await HistoryItem.bulkCreate(historyItems);
  }

  return medication;
};

/**
 * Get Medication by Animal ID
 * @param {String} animalId
 * @returns {Promise<Medication>}
 */
const getMedicationByAnimalId = async (animalId) => {
  return await Medication.findOne({
    where: { animalId },
    include: [{
      model: HistoryItem,
      as: 'historyItems',
      where: { conditionType: 'Medication' },
      required: false,
    }],
  });
};

/**
 * Update Medication
 * @param {Integer} id
 * @param {Object} updateData
 * @returns {Promise<Medication>}
 */
const updateMedication = async (id, updateData) => {
  const medication = await Medication.findByPk(id);
  if (!medication) return null;

  await medication.update({
    current_condition: updateData.current_condition || medication.current_condition,
  });

  if (updateData.history_items && Array.isArray(updateData.history_items)) {
    // Optionally, you can delete existing history items and recreate them
    await HistoryItem.destroy({ where: { conditionId: id, conditionType: 'Medication' } });
    const historyItems = updateData.history_items.map(item => ({
      title: item.title,
      value: item.value,
      conditionType: 'Medication',
      conditionId: medication.id,
    }));
    await HistoryItem.bulkCreate(historyItems);
  }

  return medication;
};

/**
 * Delete Medication
 * @param {Integer} id
 * @returns {Promise<Boolean>}
 */
const deleteMedication = async (id) => {
  const result = await Medication.destroy({ where: { id } });
  return result > 0;
};

module.exports = {
  createMedication,
  getMedicationByAnimalId,
  updateMedication,
  deleteMedication,
};