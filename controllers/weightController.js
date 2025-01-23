// controllers/weightController.js
const WeightService = require('../services/weightService');

class WeightController {
  /**
   * Create a new Weight record
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async createWeight(req, res) {
    try {
      const weight = await WeightService.createWeight(req.body);
      res.status(201).json(weight);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get all Weights by animalId
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async getAllWeightsByAnimalId(req, res) {
    try {
      const { animalId } = req.params;
      const weights = await WeightService.getAllWeightsByAnimalId(animalId);
      res.status(200).json(weights);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get a single Weight record by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async getWeightById(req, res) {
    try {
      const { id } = req.params;
      const weight = await WeightService.getWeightById(id);
      res.status(200).json(weight);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Update a Weight record by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async updateWeight(req, res) {
    try {
      const { id } = req.params;
      const updatedWeight = await WeightService.updateWeight(id, req.body);
      res.status(200).json(updatedWeight);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Delete a Weight record by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async deleteWeight(req, res) {
    try {
      const { id } = req.params;
      await WeightService.deleteWeight(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = WeightController;