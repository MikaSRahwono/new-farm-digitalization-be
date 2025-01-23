// services/lactationService.js
const { MilkProduction } = require('../models');

class MilkProductionService {
  /**
   * Create a new MilkProduction record.
   * @param {Object} data - The milkProduction data.
   * @returns {Promise<MilkProduction>}
   */
  static async createMilkProduction(data) {
    const milkProduction = await MilkProduction.create(data);
    return milkProduction;
  }

  /**
   * Get all Weight records by animalId.
   * @param {number} animalId - The ID of the animal to filter weights.
   * @returns {Promise<Array<MilkProduction>>}
   */
  static async getAllMilkProductionsByAnimalId(animalId) {
    if (!animalId) {
      throw new Error('animalId is required');
    }

    const milkProductions = await MilkProduction.findAll({
      where: { animalId },
    });
    return milkProductions;
  }

  /**
   * Get a single MilkProduction record by ID.
   * @param {number} id - The milkProduction ID.
   * @returns {Promise<MilkProduction>}
   */
  static async getMilkProductionById(id) {
    const milkProduction = await MilkProduction.findByPk(id, {
    });
    return milkProduction;
  }

  /**
   * Update a MilkProduction record by ID.
   * @param {number} id - The milkProduction ID.
   * @param {Object} data - The updated data.
   * @returns {Promise<MilkProduction>}
   */
  static async updateMilkProduction(id, data) {
    const milkProduction = await MilkProduction.findByPk(id);
    if (!milkProduction) {
      throw new Error('MilkProduction not found');
    }
    await milkProduction.update(data);
    return milkProduction;
  }

  /**
   * Delete a MilkProduction record by ID.
   * @param {number} id - The milkProduction ID.
   * @returns {Promise<void>}
   */
  static async deleteMilkProduction(id) {
    const milkProduction = await MilkProduction.findByPk(id);
    if (!milkProduction) {
      throw new Error('MilkProduction not found');
    }
    await milkProduction.destroy();
  }
}

module.exports = MilkProductionService;