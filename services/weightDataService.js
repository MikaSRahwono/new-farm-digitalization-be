// services/weightDataService.js
const { WeightData, YearlyData, MonthlyData } = require('../models');

/**
 * Create WeightData for an Animal
 * @param {String} animalId
 * @param {Array} yearlyData
 * @returns {Promise<WeightData>}
 */
const createWeightData = async (animalId, yearlyData) => {
    const weight = await WeightData.create({ animalId });

    await Promise.all(weight.yearlyDatas.map(async (yearlyDataEntry) => {
    await MonthlyData.destroy({ where: { yearlyDataId: yearlyDataEntry.id } });
    await YearlyData.destroy({ where: { id: yearlyDataEntry.id } });
    }));

    const yearlyDataEntries = await Promise.all(yearlyData.map(async (yData) => {
    const yearlyEntry = await YearlyData.create({
        year: yData.year,
        conditionType: "WeightData",
        conditionId: weight.id,
    });

    const monthData = yData.data.map(mData => ({
        month: mData.month,
        value: mData.value,
        yearlyDataId: yearlyEntry.id,
    }));

    await MonthlyData.bulkCreate(monthData);
    return yearlyEntry;
    }));

    weight.yearlyDatas = yearlyDataEntries;
    return weight;
};
  
/**
 * Get WeightData by Animal ID
 * @param {String} animalId
 * @returns {Promise<WeightData>}
 */
const getWeightDataByAnimalId = async (animalId) => {
  return await WeightData.findOne({
    where: { animalId },
    include: [{
      model: YearlyData,
      as: 'yearlyDatas',
      include: [{
        model: MonthlyData,
        as: 'monthlyDatas',
      }],
    }],
  });
};

/**
 * Update WeightData
 * @param {Integer} id
 * @param {Array} yearlyData
 * @returns {Promise<WeightData>}
 */
const updateWeightData = async (id, yearlyData) => {
  const lactation = await WeightData.findByPk(id, {
    include: [{
      model: YearlyData,
      as: 'yearlyDatas',
      include: [{ model: MonthlyData, as: 'monthlyDatas' }],
    }],
  });

  if (!lactation) return null;

  // Delete existing YearlyData and MonthlyData
  await YearlyData.destroy({ where: { animalId: lactation.animalId } });

  // Recreate YearlyData and MonthlyData
  const yearlyDataEntries = yearlyData.map(yData => ({
    year: yData.year,
    animalId: lactation.animalId,
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

  return lactation;
};

/**
 * Delete WeightData
 * @param {Integer} id
 * @returns {Promise<Boolean>}
 */
const deleteWeightData = async (id) => {
  const result = await WeightData.destroy({ where: { id } });
  return result > 0;
};

module.exports = {
  createWeightData,
  getWeightDataByAnimalId,
  updateWeightData,
  deleteWeightData,
};