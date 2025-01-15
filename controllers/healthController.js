// controllers/healthController.js
const healthService = require('../services/healthService');

/**
 * Create Health for an Animal
 */
const createHealth = async (req, res) => {
  try {
    const { animalId, current_condition, history_items } = req.body;
    const health = await healthService.createHealth(animalId, { current_condition, history_items });
    res.status(201).json(health);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

/**
 * Get Health by Animal ID
 */
const getHealthByAnimalId = async (req, res) => {
  try {
    const { animalId } = req.params;
    const health = await healthService.getHealthByAnimalId(animalId);
    if (!health) {
      return res.status(404).json({ message: 'Health data not found for this animal.' });
    }
    res.status(200).json(health);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update Health
 */
const updateHealth = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const health = await healthService.updateHealth(id, updateData);
    if (!health) {
      return res.status(404).json({ message: 'Health data not found.' });
    }
    res.status(200).json(health);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

/**
 * Delete Health
 */
const deleteHealth = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await healthService.deleteHealth(id);
    if (!success) {
      return res.status(404).json({ message: 'Health data not found.' });
    }
    res.status(200).json({ message: 'Health data deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createHealth,
  getHealthByAnimalId,
  updateHealth,
  deleteHealth,
};