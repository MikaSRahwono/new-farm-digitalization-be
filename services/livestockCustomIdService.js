const { LivestockCustomId } = require('../models');

class LivestockCustomIdService {
  /**
   * Get a custom ID by farm ID and type ID
   * @param {integer} farmId
   * @param {string} typeId
   * @returns {Promise<LivestockCustomId|null>}
   */
  async getCustomIdByFarmAndType(farmId, typeId) {
    return await LivestockCustomId.findOne({
      where: {
        farm_id: farmId,
        type_id: typeId,
      },
    });
  }

  /**
   * Create a new custom ID entry
   * @param {integer} farmId
   * @param {string} typeId
   * @param {string} customPrefix
   * @returns {Promise<LivestockCustomId>}
   */
  async createCustomId(farmId, typeId, customPrefix) {
    return await LivestockCustomId.create({
      farm_id: farmId,
      type_id: typeId,
      custom_prefix: customPrefix,
      last_number: 0,
    });
  }

  /**
   * Increment the last_number attribute for a given farm ID and type ID
   * @param {integer} farmId
   * @param {string} typeId
   * @returns {Promise<LivestockCustomId>}
   */
  async incrementLastNumber(farmId, typeId) {
    const customId = await LivestockCustomId.findOne({
      where: {
        farm_id: farmId,
        type_id: typeId,
      },
    });

    if (!customId) {
      throw new Error('Custom ID not found for the given Farm ID and Type ID');
    }

    customId.last_number += 1;
    await customId.save();

    return customId;
  }
  
  /**
   * Change a prefix
   * @param {string} typeId
   * @param {string} customPrefix
   * @returns {Promise<LivestockCustomId>}
   */
    async changePrefix(farmId, typeId, newPrefix) {
        const record = await LivestockCustomId.findOne({ where: { farm_id: farmId, type_id: typeId } });

        if (!record) {
        return null;
        }

        record.custom_prefix = newPrefix;
        record.last_number = 0; // Reset the last number to 0
        await record.save();

        return record;
    }
    }

module.exports = new LivestockCustomIdService();
