// controllers/medicationController.js
const medicationService = require('../services/medicationService');

/**
 * Create Medication for an Animal
 */
const createMedication = async (req, res) => {
  try {
    const { animalId, current_condition, history_items } = req.body;
    const medication = await medicationService.createMedication(animalId, { current_condition, history_items });
    res.status(201).json(medication);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

/**
 * Get Medication by Animal ID
 */
const getMedicationByAnimalId = async (req, res) => {
  try {
    const { animalId } = req.params;
    const medication = await medicationService.getMedicationByAnimalId(animalId);
    if (!medication) {
      return res.status(404).json({ message: 'Medication data not found for this animal.' });
    }
    res.status(200).json(medication);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update Medication
 */
const updateMedication = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const medication = await medicationService.updateMedication(id, updateData);
    if (!medication) {
      return res.status(404).json({ message: 'Medication data not found.' });
    }
    res.status(200).json(medication);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

/**
 * Delete Medication
 */
const deleteMedication = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await medicationService.deleteMedication(id);
    if (!success) {
      return res.status(404).json({ message: 'Medication data not found.' });
    }
    res.status(200).json({ message: 'Medication data deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createMedication,
  getMedicationByAnimalId,
  updateMedication,
  deleteMedication,
};