// controllers/milkProductionController.js
const MilkProductionService = require('../services/milkProductionService');

class MilkProductionController {
  /**
   * Create a new MilkProduction record
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async createMilkProduction(req, res) {
    try {
      const milkProduction = await MilkProductionService.createMilkProduction(req.body);
      res.status(201).json({success: true, data: milkProduction});
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * Get all MilkProductions by animalId
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async getAllMilkProductionsByAnimalId(req, res) {
    try {
      const { animalId } = req.params;
      const milkProductions = await MilkProductionService.getAllMilkProductionsByAnimalId(animalId);
      res.status(200).json({success: true, data: milkProductions});
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * Get a single MilkProduction record by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async getMilkProductionById(req, res) {
    try {
      const { id } = req.params;
      const milkProduction = await MilkProductionService.getMilkProductionById(id);
      res.status(200).json({success: true, data: milkProduction});
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * Update a MilkProduction record by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async updateMilkProduction(req, res) {
    try {
      const { id } = req.params;
      const updatedMilkProduction = await MilkProductionService.updateMilkProduction(id, req.body);
      res.status(200).json({success: true, data: updatedMilkProduction});
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * Delete a MilkProduction record by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async deleteMilkProduction(req, res) {
    try {
      const { id } = req.params;
      await MilkProductionService.deleteMilkProduction(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = MilkProductionController;