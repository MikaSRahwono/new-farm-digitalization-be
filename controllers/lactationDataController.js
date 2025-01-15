// controllers/lactationDataController.js
const lactationDataService = require('../services/lactationDataService');

/**
 * Create LactationData for an Animal
 */
const createLactationData = async (req, res) => {
  try {
    const { animalId, yearlyData } = req.body;
    const lactationData = await lactationDataService.createLactationData(animalId, yearlyData);
    res.status(201).json(lactationData);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

/**
 * Get LactationData by Animal ID
 */
const getLactationDataByAnimalId = async (req, res) => {
  try {
    const { animalId } = req.params;
    console.log(animalId)
    const lactationData = await lactationDataService.getLactationDataByAnimalId(animalId);
    if (!lactationData) {
      return res.status(404).json({ message: 'Lactation data not found for this animal.' });
    }
    res.status(200).json(lactationData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update LactationData
 */
const updateLactationData = async (req, res) => {
  try {
    const { id } = req.params;
    const { yearlyData } = req.body;
    const updatedLactationData = await lactationDataService.updateLactationData(id, yearlyData);
    if (!updatedLactationData) {
      return res.status(404).json({ message: 'Lactation data not found.' });
    }
    res.status(200).json(updatedLactationData);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

/**
 * Delete LactationData
 */
const deleteLactationData = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await lactationDataService.deleteLactationData(id);
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
  createLactationData,
  getLactationDataByAnimalId,
  updateLactationData,
  deleteLactationData,
};