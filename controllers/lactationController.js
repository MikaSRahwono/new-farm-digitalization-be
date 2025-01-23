const LactationService = require('../services/lactationService');

class LactationController {
  /**
   * Create a new Lactation record
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async createLactation(req, res) {
    try {
      const { lactationData, lactationChildData } = req.body;
      const lactation = await LactationService.createLactation(lactationData, lactationChildData);
      res.status(201).json({success: true, data: lactation});
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * Get all Lactations by animalId
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async getAllLactationsByAnimalId(req, res) {
    try {
      const { animalId } = req.params;
      const lactations = await LactationService.getAllLactationsByAnimalId(animalId);
      res.status(200).json({success: true, data: lactations});
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * Get a single Lactation record by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async getLactationById(req, res) {
    try {
      const { id } = req.params;
      const lactation = await LactationService.getLactationById(id);
      res.status(200).json({success: true, data: lactation});
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * Update a Lactation record by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async updateLactation(req, res) {
    try {
      const { id } = req.params;
      const updatedLactation = await LactationService.updateLactation(id, req.body);
      res.status(200).json({success: true, data: updatedLactation});
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * Delete a Lactation record by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async deleteLactation(req, res) {
    try {
      const { id } = req.params;
      await LactationService.deleteLactation(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = LactationController;