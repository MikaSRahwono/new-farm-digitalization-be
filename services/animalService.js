// services/animalService.js
const { Animal, Health, Medication, Vitamin, Vaccine, LactationData, MilkData, WeightData, YearlyData, MonthlyData } = require('../models');

/**
 * Create a new animal record
 * @param {Object} animalData
 * @returns {Promise<Object>}
 */
const createAnimal = async (animalData) => {
  const animal = await Animal.create(animalData);
  return animal;
};

/**
 * Get all animals with optional query parameters
 * @param {Object} query
 * @returns {Promise<Array>}
 */
const getAllAnimals = async (query) => {
  // Implement filtering based on query parameters if needed
  const animals = await Animal.findAll({ where: query });
  return animals;
};

/**
 * Get a single animal by primary key (id)
 * @param {String} id
 * @returns {Promise<Object|null>}
 */
const getAnimalById = async (id) => {
    return await Animal.findOne({
      where: { id },
      include: [
        {
          model: Health,
          as: 'health',
          required: false
        },
        {
          model: Medication,
          as: 'medication',
          required: false
        },
        {
          model: Vitamin,
          as: 'vitamin',
          required: false
        },
        {
          model: Vaccine,
          as: 'vaccine',
          required: false
        },
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
        {
          model: WeightData,
          as: 'weightData',
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
    });
  };

/**
 * Update an animal by ID
 * @param {String} id
 * @param {Object} updateData
 * @returns {Promise<Object|null>}
 */
const updateAnimal = async (id, updateData) => {
  const animal = await Animal.findByPk(id);
  if (!animal) {
    return null;
  }
  await animal.update(updateData);
  return animal;
};

/**
 * Delete an animal by ID
 * @param {String} id
 * @returns {Promise<Boolean>}
 */
const deleteAnimal = async (id) => {
  const result = await Animal.destroy({ where: { id } });
  return result > 0;
};

module.exports = {
  createAnimal,
  getAllAnimals,
  getAnimalById,
  updateAnimal,
  deleteAnimal,
};