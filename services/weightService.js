// services/lactationService.js
const { Weight } = require('../models');

class WeightService {
  /**
   * Create a new Weight record.
   * @param {Object} data - The weight data.
   * @returns {Promise<Weight>}
   */
  static async createWeight(data) {
    const weight = await Weight.create(data);
    return weight;
  }

  /**
   * Get all Weight records by animalId.
   * @param {number} animalId - The ID of the animal to filter weights.
   * @returns {Promise<Array<Weight>>}
   */
  static async getAllWeightsByAnimalId(animalId) {
    if (!animalId) {
      throw new Error('animalId is required');
    }

    const weights = await Weight.findAll({
      where: { animalId }
    });
    return weights;
  }

  /**
   * Get a single Weight record by ID.
   * @param {number} id - The weight ID.
   * @returns {Promise<Weight>}
   */
  static async getWeightById(id) {
    const weight = await Weight.findByPk(id, {
    });
    return weight;
  }

  /**
   * Update a Weight record by ID.
   * @param {number} id - The weight ID.
   * @param {Object} data - The updated data.
   * @returns {Promise<Weight>}
   */
  static async updateWeight(id, data) {
    const weight = await Weight.findByPk(id);
    if (!weight) {
      throw new Error('Weight not found');
    }
    await weight.update(data);
    return weight;
  }

  /**
   * Delete a Weight record by ID.
   * @param {number} id - The weight ID.
   * @returns {Promise<void>}
   */
  static async deleteWeight(id) {
    const weight = await Weight.findByPk(id);
    if (!weight) {
      throw new Error('Weight not found');
    }
    await weight.destroy();
  }
}

module.exports = WeightService;