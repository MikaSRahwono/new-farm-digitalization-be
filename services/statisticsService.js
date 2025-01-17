// services/statisticsService.js

const { Animal } = require('../models'); // Make sure the Animal model is properly imported

class StatisticsService {
  async getCowStatistics(farmId) {
    const cows = await Animal.findAll({
      where: {
        category: 'Sapi',
        farmId: farmId,  // Filter by farmId
      },
    });

    const stats = await this.calculateFarmStatistics(cows); // Calculate statistics for the specified farm
    return { success: true, data: stats }; // Return response in the desired format
  }

  async getGoatStatistics(farmId) {
    const goats = await Animal.findAll({
      where: {
        category: 'Kambing',
        farmId: farmId,  // Filter by farmId
      },
    });

    const stats = await this.calculateFarmStatistics(goats); // Calculate statistics for the specified farm
    return { success: true, data: stats }; // Return response in the desired format
  }

  async getSheepStatistics(farmId) {
    const sheep = await Animal.findAll({
      where: {
        category: 'Domba',
        farmId: farmId,  // Filter by farmId
      },
    });

    const stats = await this.calculateFarmStatistics(sheep); // Calculate statistics for the specified farm
    return { success: true, data: stats }; // Return response in the desired format
  }

  /**
   * This method calculates statistics for a given set of animals (filtered by farmId)
   */
  async calculateFarmStatistics(animals) {
    const farmStats = {
      total: 0,
      totalMale: 0,
      totalFemale: 0,
      malePhaseStats: {},
      femalePhaseStats: {},
      livestockConditionStats: {},
    };

    // Group animals by farmId
    animals.forEach(animal => {
      // Increment total count for the farm
      farmStats.total += 1;

      if (animal.gender === 'MALE') {
        farmStats.totalMale += 1;

        // Phase statistics for male animals
        farmStats.malePhaseStats[animal.phase] = (farmStats.malePhaseStats[animal.phase] || 0) + 1;
      } else if (animal.gender === 'FEMALE') {
        farmStats.totalFemale += 1;

        // Phase statistics for female animals
        farmStats.femalePhaseStats[animal.phase] = (farmStats.femalePhaseStats[animal.phase] || 0) + 1;
      }

      // Livestock condition (status) statistics
      farmStats.livestockConditionStats[animal.status] = (farmStats.livestockConditionStats[animal.status] || 0) + 1;
    });

    // Return statistics for the specific farm
    return farmStats;
  }
}

module.exports = new StatisticsService();
