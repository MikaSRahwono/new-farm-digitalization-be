// controllers/farmController.js
const FarmService = require('../services/farmService');

class FarmController {
    /**
     * Get all farms by ownerId
     */
    static async getAllFarms(req, res) {
        const { ownerId } = req.query;
        try {
            const farms = await FarmService.getAllFarms(ownerId);
            res.status(200).json({success: true, data: farms});
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    /**
     * Get all farms by operatorId
     */
    static async getFarmsByOperator(req, res) {
        const { operatorId } = req.params;
        try {
            const farms = await FarmService.getFarmsByOperator(operatorId);
            res.status(200).json({ success: true, data: farms });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    /**
     * Get farm by Id
     */
    static async getFarmById(req, res) {
        try {
            const farm = await FarmService.getFarmById(req.params.id);
            if (!farm) return res.status(404).json({ error: 'Farm not found' });
            res.status(200).json({success: true, data: farm});
        } catch (error) {
            res.status(500).json({success: false,  error: error.message });
        }
    }

    /**
     * Create farm
     */
    static async createFarm(req, res) {
        try {
            const farm = await FarmService.createFarm(req.body);
            res.status(201).json({success: true, data: farm});
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    /**
     * Update farm
     */
    static async updateFarm(req, res) {
        try {
            const farm = await FarmService.updateFarm(req.params.id, req.body);
            res.status(200).json({success: true, data: farm});
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
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
            res.status(500).json({ success: false, error: error.message });
        }
    }
}

module.exports = FarmController;
