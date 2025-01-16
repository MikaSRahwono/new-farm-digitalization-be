const { LactationData, YearlyData, MonthlyData } = require('../models');

/**
 * Create LactationData for an Animal
 * @param {Object} data - The data object containing animalId and yearlyData
 * @returns {Promise<LactationData>}
 */
const createLactationData = async (animalId, yearlyData) => {
    const lactation = await LactationData.create({ animalId });

    const yearlyDataEntries = await Promise.all(yearlyData.map(async (yData) => {
        const yearlyEntry = await YearlyData.create({
            year: yData.year,
            conditionType: "LactationData",
            conditionId: lactation.id,
        });

        const monthData = yData.data.map(mData => ({
        month: mData.month,
        value: mData.value,
        yearlyDataId: yearlyEntry.id,
        }));

        await MonthlyData.bulkCreate(monthData);
        return yearlyEntry;
    }));

    return lactation;
};

/**
 * Get LactationData by Animal ID
 * @param {String} animalId
 * @returns {Promise<LactationData>}
 */
const getLactationDataByAnimalId = async (animalId) => {
    console.log("Testing " + animalId)
    return await LactationData.findOne({
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
 * Update LactationData
 * @param {Integer} id
 * @param {Object} data - The data object containing yearlyData
 * @returns {Promise<LactationData>}
 */
const updateLactationData = async (id, data) => {
    const { yearlyData } = data;

    const lactation = await LactationData.findByPk(id, {
        include: [{
        model: YearlyData,
        as: 'yearlyDatas',
        include: [{ model: MonthlyData, as: 'monthlyDatas' }],
        }],
    });

    if (!lactation) return null;

    // Delete existing YearlyData and MonthlyData
    await MonthlyData.destroy({ where: { yearlyDataId: lactation.id } });
    await YearlyData.destroy({ where: { conditionId: lactation.id } });

    // Recreate YearlyData and MonthlyData
    const yearlyDataEntries = await Promise.all(yearlyData.map(async (yData) => {
        const yearlyEntry = await YearlyData.create({
        year: yData.year,
        conditionId: lactation.id, // Assuming conditionId is the lactation ID
        });

        // Create MonthlyData entries for each YearlyData entry
        const monthData = yData.data.map(mData => ({
        month: mData.month,
        value: mData.value,
        yearlyDataId: yearlyEntry.id,
        }));

        await MonthlyData.bulkCreate(monthData);
        return yearlyEntry;
    }));

    return lactation;
};

/**
 * Delete LactationData
 * @param {Integer} id
 * @returns {Promise<Boolean>}
 */
const deleteLactationData = async (id) => {
    const result = await LactationData.destroy({ where: { id } });
    return result > 0;
};

module.exports = {
    createLactationData,
    getLactationDataByAnimalId,
    updateLactationData,
    deleteLactationData,
};