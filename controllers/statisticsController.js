// controllers/statisticsController.js

const statisticsService = require('../services/statisticsService');

class StatisticsController {
  async getCowStatistics(req, res) {
    const { farmId } = req.query; // Extract farmId from the query parameters

    if (!farmId) {
      return res.status(400).json({ error: 'farmId is required' });
    }

    try {
      const statistics = await statisticsService.getCowStatistics(farmId);
      return res.json(statistics);
    } catch (error) {
      return res.status(500).json({ error: 'An error occurred while fetching cow statistics' });
    }
  }

  async getGoatStatistics(req, res) {
    const { farmId } = req.query; // Extract farmId from the query parameters

    if (!farmId) {
      return res.status(400).json({ error: 'farmId is required' });
    }

    try {
      const statistics = await statisticsService.getGoatStatistics(farmId);
      return res.json(statistics);
    } catch (error) {
      return res.status(500).json({ error: 'An error occurred while fetching goat statistics' });
    }
  }

  async getSheepStatistics(req, res) {
    const { farmId } = req.query; // Extract farmId from the query parameters

    if (!farmId) {
      return res.status(400).json({ error: 'farmId is required' });
    }

    try {
      const statistics = await statisticsService.getSheepStatistics(farmId);
      return res.json(statistics);
    } catch (error) {
      return res.status(500).json({ error: 'An error occurred while fetching sheep statistics' });
    }
  }
}

module.exports = new StatisticsController();
