// controllers/lactationDataController.js
const lactationDataService = require('../services/lactationDataService');

/**
 * Create LactationData for an Animal
 */
const createLactationData = async (req, res) => {
  try {
    const { animalId, yearlyData } = req.body;
    const lactationData = await lactationDataService.createLactationData(animalId, yearlyData);
    res.status(201).json({success: true, data: lactationData});
  } catch (error) {
    console.error(error);
    res.status(400).json({success: false, message: error.message });
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
      return res.status(404).json({ success: false, message: 'Lactation data not found for this animal.' });
    }
    res.status(200).json({success: true, data: lactationData});
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
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
      return res.status(404).json({ success: false, message: 'Lactation data not found.' });
    }
    res.status(200).json({success: true, data: updatedLactationData});
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
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
      return res.status(404).json({ success: false, message: 'Lactation data not found.' });
    }
    res.status(200).json({ success: true, message: 'Lactation data deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createLactationData,
  getLactationDataByAnimalId,
  updateLactationData,
  deleteLactationData,
};