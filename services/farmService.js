const { Farm, User } = require('../models');

/**
 * Get all farms.
 * @returns {Promise<Array>} A promise that resolves to an array of farms.
 */
const getAllFarms = async (ownerId) => {
    try {
        const farms = await Farm.findAll({
            where: {
                ownerId: ownerId,
            },
            include: [
                {
                    model: User,
                    as: 'operators',
                    attributes: ['id', 'name', 'email', 'profile_url', 'role'],
                },
                {
                    model: User,
                    as: 'owner',
                    attributes: ['id', 'name', 'email', 'profile_url', 'role'],
                },
              
            ],
        });
        return farms;
    } catch (error) {
        console.error("Error fetching farms:", error);
        throw error;
    }
};

/**
 * Get all farms for a specific operator.
 * @returns {Promise<Array>} A promise that resolves to an array of farms.
 */
const getFarmsByOperator = async (operatorId) => {
    try {
        const farms = await Farm.findAll({
            include: [
            {
                model: User,
                as: 'operators',
                where: {
                    id: operatorId
                },
                attributes: ['id', 'name', 'email', 'profile_url', 'role'],
            },
            {
                model: User,
                as: 'owner',
                attributes: ['id', 'name', 'email', 'profile_url', 'role'],
            },
        ],
        });

        // If no farms are found, return success with an empty array
        return farms.length === 0 ? [] : farms;
    } catch (error) {
        console.error("Error fetching farms by operator:", error);
        throw error;
    }
};
/**
 * Get a farm by ID.
 * @param {number} id - The ID of the farm.
 * @returns {Promise<Object|null>} A promise that resolves to the farm object or null if not found.
 */
const getFarmById = async (id) => {
    return await Farm.findByPk(id);
};

/**
 * Create a new farm.
 * @param {Object} farmData - The data of the farm to create.
 * @param {string} farmData.name - The name of the farm.
 * @param {string} farmData.category - The category of the farm.
 * @param {number} farmData.ownerId - The ID of the farm's owner.
 * @returns {Promise<Object>} A promise that resolves to the created farm.
 */
const createFarm = async (farmData) => {
    return await Farm.create(farmData);
};

/**
 * Update an existing farm.
 * @param {number} id - The ID of the farm to update.
 * @param {Object} farmData - The updated farm data.
 * @returns {Promise<Object|null>} A promise that resolves to the updated farm object or null if not found.
 */
const updateFarm = async (id, farmData) => {
    const farm = await Farm.findByPk(id);
    if (!farm) return null;

    return await farm.update(farmData);
};

/**
 * Delete a farm by ID.
 * @param {number} id - The ID of the farm to delete.
 * @returns {Promise<boolean>} A promise that resolves to true if the farm was deleted, or false if not found.
 */
const deleteFarm = async (id) => {
    const farm = await Farm.findByPk(id);
    if (!farm) return false;

    await farm.destroy();
    return true;
};

module.exports = {
    getAllFarms,
    getFarmsByOperator,
    getFarmById,
    createFarm,
    updateFarm,
    deleteFarm,
};
