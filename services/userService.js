const { User } = require('../models');

/**
 * Get all users.
 * @returns {Promise<Array>} A promise that resolves to an array of users.
 */
const getAllUsers = async () => {
    return await User.findAll();
};

/**
 * Get a user by ID.
 * @param {number} id - The ID of the user.
 * @returns {Promise<Object|null>} A promise that resolves to the user object or null if not found.
 */
const getUserById = async (id) => {
    return await User.findByPk(id);
};

/**
 * Create a new user.
 * @param {Object} userData - The data of the user to create.
 * @param {string} userData.name - The name of the user.
 * @param {string} userData.email - The email of the user.
 * @param {string} userData.profile_url - The profile URL of the user.
 * @returns {Promise<Object>} A promise that resolves to the created user.
 */
const createUser = async (userData) => {
    return await User.create(userData);
};

/**
 * Update an existing user.
 * @param {number} id - The ID of the user to update.
 * @param {Object} userData - The updated user data.
 * @returns {Promise<Object|null>} A promise that resolves to the updated user object or null if not found.
 */
const updateUser = async (id, userData) => {
    const user = await User.findByPk(id);
    if (!user) return null;

    return await user.update(userData);
};

/**
 * Delete a user by ID.
 * @param {number} id - The ID of the user to delete.
 * @returns {Promise<boolean>} A promise that resolves to true if the user was deleted, or false if not found.
 */
const deleteUser = async (id) => {
    const user = await User.findByPk(id);
    if (!user) return false;

    await user.destroy();
    return true;
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
