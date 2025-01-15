// controllers/vitaminController.js
const vitaminService = require('../services/vitaminService');

/**
 * Create Vitamin for an Animal
 */
const createVitamin = async (req, res) => {
  try {
    const { animalId, current_condition, history_items } = req.body;
    const vitamin = await vitaminService.createVitamin(animalId, { current_condition, history_items });
    res.status(201).json({success: true, data: vitamin});
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Get Vitamin by Animal ID
 */
const getVitaminByAnimalId = async (req, res) => {
  try {
    const { animalId } = req.params;
    const vitamin = await vitaminService.getVitaminByAnimalId(animalId);
    if (!vitamin) {
      return res.status(404).json({ success: false, message: 'Vitamin data not found for this animal.' });
    }
    res.status(200).json({success: true, data: vitamin});
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Update Vitamin
 */
const updateVitamin = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const vitamin = await vitaminService.updateVitamin(id, updateData);
    if (!vitamin) {
      return res.status(404).json({ success: false, message: 'Vitamin data not found.' });
    }
    res.status(200).json({success: true, data: vitamin});
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Delete Vitamin
 */
const deleteVitamin = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await vitaminService.deleteVitamin(id);
    if (!success) {
      return res.status(404).json({ success: false, message: 'Vitamin data not found.' });
    }
    res.status(200).json({ success: true, message: 'Vitamin data deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createVitamin,
  getVitaminByAnimalId,
  updateVitamin,
  deleteVitamin,
};