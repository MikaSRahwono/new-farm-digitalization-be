// controllers/farmController.js
const FarmService = require('../services/farmService');

class FarmController {
    /**
     * Get all farms
     */
    static async getAllFarms(req, res) {
        try {
        const farms = await FarmService.getAllFarms();
        res.status(200).json(farms);
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    }

    /**
     * Get farm by Id
     */
    static async getFarmById(req, res) {
        try {
        const farm = await FarmService.getFarmById(req.params.id);
        if (!farm) return res.status(404).json({ error: 'Farm not found' });
        res.status(200).json(farm);
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    }

    /**
     * Create farm
     */
    static async createFarm(req, res) {
        try {
        const farm = await FarmService.createFarm(req.body);
        res.status(201).json(farm);
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    }

    /**
     * Update farm
     */
    static async updateFarm(req, res) {
        try {
        const farm = await FarmService.updateFarm(req.params.id, req.body);
        res.status(200).json(farm);
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    }

    /**
     * Delete farm
     */
    static async deleteFarm(req, res) {
        try {
        await FarmService.deleteFarm(req.params.id);
        res.status(204).send();
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    }

    /**
     * Add operator to Farm
     */
    static async addOperators(req, res) {
        try {
        const { userIds } = req.body;
        const farm = await FarmService.addOperators(req.params.id, userIds);
        res.status(200).json(farm);
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    }
}

module.exports = FarmController;
