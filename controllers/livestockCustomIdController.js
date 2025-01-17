const LivestockCustomIdService = require('../services/livestockCustomIdService');

class LivestockCustomIdController {
  /**
   * Get a custom ID by farm ID and type ID
   * @param {Request} req
   * @param {Response} res
   */
  async getCustomIdByFarmAndType(req, res) {
    try {
      const { farmId, typeId } = req.params;
      const customId = await LivestockCustomIdService.getCustomIdByFarmAndType(farmId, typeId);

      if (!customId) {
        return res.status(404).json({ message: 'Custom ID not found' });
      }

      res.json(customId);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Create a new custom ID
   * @param {Request} req
   * @param {Response} res
   */
  async createCustomId(req, res) {
    try {
      const { farmId, typeId, customPrefix } = req.body;

      const customId = await LivestockCustomIdService.createCustomId(farmId, typeId, customPrefix);

      res.status(201).json(customId);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Increment the last_number attribute
   * @param {Request} req
   * @param {Response} res
   */
  async incrementLastNumber(req, res) {
    try {
      const { farmId, typeId } = req.body;

      const customId = await LivestockCustomIdService.incrementLastNumber(farmId, typeId);

      res.json(customId);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Change Prefix @param {Request} req
   * @param {Response} res
   */
    async changePrefix(req, res) {
        const { farmId, typeId } = req.body;
        const { newPrefix } = req.body;

        try {
        const updated = await LivestockCustomIdService.changePrefix(farmId, typeId, newPrefix);

        if (!updated) {
            return res.status(404).json({ message: 'Custom ID not found' });
        }

        return res.status(200).json({ message: 'Prefix updated successfully and last_number reset to 0' });
        } catch (error) {
        return res.status(500).json({ error: 'Internal server error', details: error.message });
        }
    }
}

module.exports = new LivestockCustomIdController();
