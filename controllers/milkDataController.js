// controllers/milkDataController.js
const milkDataService = require('../services/milkDataService');

/**
 * Create MilkData for an Animal
 */
const createMilkData = async (req, res) => {
  try {
    const { animalId, yearlyData } = req.body;
    const milkData = await milkDataService.createMilkData(animalId, yearlyData);
    res.status(201).json({success: true, data: milkData});
  } catch (error) {
    console.error(error);
    res.status(400).json({success: false,  message: error.message });
  }
};

/**
 * Get MilkData by Animal ID
 */
const getMilkDataByAnimalId = async (req, res) => {
  try {
    const { animalId } = req.params;
    const milkData = await milkDataService.getMilkDataByAnimalId(animalId);
    if (!milkData) {
      return res.status(404).json({ success: false, message: 'Lactation data not found for this animal.' });
    }
    res.status(200).json({success: true, data: milkData});
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Update MilkData
 */
const updateMilkData = async (req, res) => {
  try {
    const { id } = req.params;
    const { yearlyData } = req.body;
    const updatedMilkData = await milkDataService.updateMilkData(id, yearlyData);
    if (!updatedMilkData) {
      return res.status(404).json({ success: false, message: 'Lactation data not found.' });
    }
    res.status(200).json({success: true, data: updatedMilkData});
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Delete MilkData
 */
const deleteMilkData = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await milkDataService.deleteMilkData(id);
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
  createMilkData,
  getMilkDataByAnimalId,
  updateMilkData,
  deleteMilkData,
};