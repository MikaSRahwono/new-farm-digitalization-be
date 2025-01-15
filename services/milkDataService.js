// services/milkDataService.js
const { MilkData, YearlyData, MonthlyData } = require('../models');

/**
 * Create MilkData for an Animal
 * @param {String} animalId
 * @param {Array} yearlyData
 * @returns {Promise<MilkData>}
 */
const createMilkData = async (animalId, yearlyData) => {
    const milk = await MilkData.create({ animalId });

    const yearlyDataEntries = await Promise.all(yearlyData.map(async (yData) => {
        const yearlyEntry = await YearlyData.create({
            year: yData.year,
            conditionType: "MilkData",
            conditionId: milk.id,
        });

        const monthData = yData.data.map(mData => ({
        month: mData.month,
        value: mData.value,
        yearlyDataId: yearlyEntry.id,
        }));

        await MonthlyData.bulkCreate(monthData);
        return yearlyEntry;
    }));

    return milk;
};


/**
 * Get MilkData by Animal ID
 * @param {String} animalId
 * @returns {Promise<MilkData>}
 */
const getMilkDataByAnimalId = async (animalId) => {
  return await MilkData.findOne({
    where: { animalId },
    include: [{
      model: YearlyData,
      as: 'yearlyDatas',
      required: false,
      include: [{
        model: MonthlyData,
        as: 'monthlyDatas',
        required: false
      }],
    }],
  });
};

/**
 * Update MilkData
 * @param {Integer} id
 * @param {Array} yearlyData
 * @returns {Promise<MilkData>}
 */
const updateMilkData = async (id, yearlyData) => {
  const milk = await MilkData.findByPk(id, {
    include: [{
      model: YearlyData,
      as: 'yearlyData',
      include: [{ model: MonthlyData, as: 'monthlyData' }],
    }],
  });

  if (!milk) return null;

  // Delete existing YearlyData and MonthlyData
  await YearlyData.destroy({ where: { animalId: milk.animalId } });

  // Recreate YearlyData and MonthlyData
  const yearlyDataEntries = yearlyData.map(yData => ({
    year: yData.year,
    animalId: milk.animalId,
  }));

  const createdYearlyDatas = await YearlyData.bulkCreate(yearlyDataEntries, { returning: true });

  for (let i = 0; i < createdYearlyDatas.length; i++) {
    const monthData = yearlyData[i].data.map(mData => ({
      month: mData.month,
      value: mData.value,
      yearlyDataId: createdYearlyDatas[i].id,
    }));
    await MonthlyData.bulkCreate(monthData);
  }

  return milk;
};

/**
 * Delete MilkData
 * @param {Integer} id
 * @returns {Promise<Boolean>}
 */
const deleteMilkData = async (id) => {
  const result = await MilkData.destroy({ where: { id } });
  return result > 0;
};

module.exports = {
  createMilkData,
  getMilkDataByAnimalId,
  updateMilkData,
  deleteMilkData,
};