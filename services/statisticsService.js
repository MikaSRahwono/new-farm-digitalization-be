// services/statisticsService.js

const { Animal, LactationData, MilkData, YearlyData, MonthlyData } = require('../models');

class StatisticsService {
  async getCowStatistics(farmId) {
    const cows = await Animal.findAll({
      where: {
        category: 'Sapi',
        farmId: farmId, 
      },
    });

    const stats = await this.calculateFarmStatistics(cows);
    const lactationData = await this.getAnimalCategorySummaryLactationData("Sapi")
    const milkData = await this.getAnimalCategorySummaryMilkData("Sapi")
    return { success: true, data: {
      summary: stats,
      lactationData: lactationData,
      milkData: milkData
    } }; 
  }

  async getGoatStatistics(farmId) {
    const goats = await Animal.findAll({
      where: {
        category: 'Kambing',
        farmId: farmId,  
      },
    });

    const stats = await this.calculateFarmStatistics(goats);
    const lactationData = await this.getAnimalCategorySummaryLactationData("Kambing")
    const milkData = await this.getAnimalCategorySummaryMilkData("Kambing")
    return { success: true, data: {
      summary: stats,
      lactationData: lactationData,
      milkData: milkData
    } }; 
  }

  async getSheepStatistics(farmId) {
    const sheep = await Animal.findAll({
      where: {
        category: 'Domba',
        farmId: farmId,
      },
    });

    const stats = await this.calculateFarmStatistics(sheep);
    const lactationData = await this.getAnimalCategorySummaryLactationData("Domba")
    const milkData = await this.getAnimalCategorySummaryMilkData("Domba")
    return { success: true, data: {
      summary: stats,
      lactationData: lactationData,
      milkData: milkData
    } }; 
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

    animals.forEach(animal => {
      farmStats.total += 1;

      if (animal.gender === 'MALE') {
        farmStats.totalMale += 1;

        farmStats.malePhaseStats[animal.phase] = (farmStats.malePhaseStats[animal.phase] || 0) + 1;
      } else if (animal.gender === 'FEMALE') {
        farmStats.totalFemale += 1;

        farmStats.femalePhaseStats[animal.phase] = (farmStats.femalePhaseStats[animal.phase] || 0) + 1;
      }

      farmStats.livestockConditionStats[animal.status] = (farmStats.livestockConditionStats[animal.status] || 0) + 1;
    });

    return farmStats;
  }

  async getAnimalCategorySummaryLactationData(category) {
    try {
      const animals = await Animal.findAll({
        where: {
          category,
        },
        include: [
          {
            model: LactationData,
            as: 'lactationData',
            include: [
              {
                model: YearlyData,
                as: 'yearlyDatas',
                include: [
                  {
                    model: MonthlyData,
                    as: 'monthlyDatas',
                  },
                ],
              },
            ],
          },
        ],
        order: [
          ['category', 'ASC'],
        ],
      });
  
      const summary = {
        yearlyData: [],
      };
  
      animals.forEach((animal) => {
        const { lactationData } = animal;
        console.log(animal)
        console.log(lactationData)
        if (!lactationData) return;
  
        lactationData.yearlyDatas.forEach((yearlyData) => {
          let yearEntry = summary.yearlyData.find(
            (entry) => entry.year === yearlyData.year
          );
  
          if (!yearEntry) {
            yearEntry = {
              year: yearlyData.year,
              data: Array.from({ length: 12 }, (_, i) => ({
                month: new Date(0, i).toLocaleString('default', { month: 'short' }),
                value: 0,
              })),
            };
            summary.yearlyData.push(yearEntry);
          }
  
          yearlyData.monthlyDatas.forEach((monthlyData) => {
            const monthIndex = new Date(`${monthlyData.month} 1`).getMonth();
            yearEntry.data[monthIndex].value += monthlyData.value;
          });
        });
      });
  
      return summary;
    } catch (error) {
      console.error('Error fetching animal category summary:', error);
      throw new Error('Could not fetch animal category summary.');
    }
  }
  
  async getAnimalCategorySummaryMilkData(category) {
    try {
      const animals = await Animal.findAll({
        where: {
          category,
        },
        include: [
          {
            model: MilkData,
            as: 'milkData',
            include: [
              {
                model: YearlyData,
                as: 'yearlyDatas',
                include: [
                  {
                    model: MonthlyData,
                    as: 'monthlyDatas',
                  },
                ],
              },
            ],
          },
        ],
        order: [
          ['category', 'ASC'],
        ],
      });
  
      const summary = {
        yearlyData: [],
      };
  
      animals.forEach((animal) => {
        const { milkData } = animal;
        console.log(animal)
        console.log(milkData)
        if (!milkData) return;
  
        milkData.yearlyDatas.forEach((yearlyData) => {
          let yearEntry = summary.yearlyData.find(
            (entry) => entry.year === yearlyData.year
          );
  
          if (!yearEntry) {
            yearEntry = {
              year: yearlyData.year,
              data: Array.from({ length: 12 }, (_, i) => ({
                month: new Date(0, i).toLocaleString('default', { month: 'short' }),
                value: 0,
              })),
            };
            summary.yearlyData.push(yearEntry);
          }
  
          yearlyData.monthlyDatas.forEach((monthlyData) => {
            const monthIndex = new Date(`${monthlyData.month} 1`).getMonth();
            yearEntry.data[monthIndex].value += monthlyData.value;
          });
        });
      });
  
      return summary;
    } catch (error) {
      console.error('Error fetching animal category summary:', error);
      throw new Error('Could not fetch animal category summary.');
    }
  }
}

module.exports = new StatisticsService();
