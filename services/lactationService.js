// services/lactationService.js
const { Lactation, LactationChild } = require('../models');

class LactationService {
  /**
   * Create a new Lactation record.
   * @param {Object} data - The lactation data.
   * @returns {Promise<Lactation>}
   */
  static async createLactation(lactationData, lactationChildData) {
    const lactation = await Lactation.create(lactationData);

    const lactationChildDatas = lactationChildData.map(child => ({
            ...child,
            lactationId: lactation.id,
        }));

    await LactationChild.bulkCreate(lactationChildDatas);

    return lactation;
  }

  /**
   * Get all Weight records by animalId.
   * @param {number} animalId - The ID of the animal to filter weights.
   * @returns {Promise<Array<Lactation>>}
   */
  static async getAllLactationsByAnimalId(animalId) {
    if (!animalId) {
      throw new Error('animalId is required');
    }

    const lactations = await Lactation.findAll({
      where: { animalId },
      include: [
        { model: LactationChild, as: 'lactationChilds' },
      ],
    });
    return lactations;
  }

  /**
   * Get a single Lactation record by ID.
   * @param {number} id - The lactation ID.
   * @returns {Promise<Lactation>}
   */
  static async getLactationById(id) {
    const lactation = await Lactation.findByPk(id, {
      include: [
        { model: LactationChild, as: 'lactationChilds' },
      ],
    });
    return lactation;
  }

  /**
   * Update a Lactation record by ID.
   * @param {number} id - The lactation ID.
   * @param {Object} data - The updated data.
   * @returns {Promise<Lactation>}
   */
  static async updateLactation(id, data) {
    const lactation = await Lactation.findByPk(id);
    if (!lactation) {
      throw new Error('Lactation not found');
    }
    await lactation.update(data);
    return lactation;
  }

  /**
   * Delete a Lactation record by ID.
   * @param {number} id - The lactation ID.
   * @returns {Promise<void>}
   */
  static async deleteLactation(id) {
    const lactation = await Lactation.findByPk(id);
    if (!lactation) {
      throw new Error('Lactation not found');
    }
    await lactation.destroy();
  }
}

module.exports = LactationService;