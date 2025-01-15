// controllers/weightDataController.js
const weightDataService = require('../services/weightDataService');

/**
 * Create WeightData for an Animal
 */
const createWeightData = async (req, res) => {
  try {
    const { animalId, yearlyData } = req.body;
    const weightData = await weightDataService.createWeightData(animalId, yearlyData);
    res.status(201).json(weightData);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

/**
 * Get WeightData by Animal ID
 */
const getWeightDataByAnimalId = async (req, res) => {
  try {
    const { animalId } = req.params;
    const weightData = await weightDataService.getWeightDataByAnimalId(animalId);
    if (!weightData) {
      return res.status(404).json({ message: 'Lactation data not found for this animal.' });
    }
    res.status(200).json(weightData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update WeightData
 */
const updateWeightData = async (req, res) => {
  try {
    const { id } = req.params;
    const { yearlyData } = req.body;
    const updatedWeightData = await weightDataService.updateWeightData(id, yearlyData);
    if (!updatedWeightData) {
      return res.status(404).json({ message: 'Lactation data not found.' });
    }
    res.status(200).json(updatedWeightData);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

/**
 * Delete WeightData
 */
const deleteWeightData = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await weightDataService.deleteWeightData(id);
    if (!success) {
      return res.status(404).json({ message: 'Lactation data not found.' });
    }
    res.status(200).json({ message: 'Lactation data deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createWeightData,
  getWeightDataByAnimalId,
  updateWeightData,
  deleteWeightData,
};