// controllers/vaccineController.js
const vaccineService = require('../services/vaccineService');

/**
 * Create Vaccine for an Animal
 */
const createVaccine = async (req, res) => {
  try {
    const { animalId, current_condition, history_items } = req.body;
    const vaccine = await vaccineService.createVaccine(animalId, { current_condition, history_items });
    res.status(201).json(vaccine);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

/**
 * Get Vaccine by Animal ID
 */
const getVaccineByAnimalId = async (req, res) => {
  try {
    const { animalId } = req.params;
    const vaccine = await vaccineService.getVaccineByAnimalId(animalId);
    if (!vaccine) {
      return res.status(404).json({ message: 'Vaccine data not found for this animal.' });
    }
    res.status(200).json(vaccine);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update Vaccine
 */
const updateVaccine = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const vaccine = await vaccineService.updateVaccine(id, updateData);
    if (!vaccine) {
      return res.status(404).json({ message: 'Vaccine data not found.' });
    }
    res.status(200).json(vaccine);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

/**
 * Delete Vaccine
 */
const deleteVaccine = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await vaccineService.deleteVaccine(id);
    if (!success) {
      return res.status(404).json({ message: 'Vaccine data not found.' });
    }
    res.status(200).json({ message: 'Vaccine data deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createVaccine,
  getVaccineByAnimalId,
  updateVaccine,
  deleteVaccine,
};