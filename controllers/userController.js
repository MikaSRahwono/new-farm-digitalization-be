// controllers/userController.js
const userService = require('../services/userService');

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json({success: true, data: users});
    } catch (error) {
        res.status(500).json({success: false,  message: 'Failed to retrieve users', error });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: truefalse, message: 'User not found' });
        }
        res.status(200).json({success: true, data: user});
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to retrieve user', error });
    }
};

const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json({success: true, data: user});
    } catch (error) {
        res.status(500).json({success: false, message: 'Failed to create user', error });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        if (!user) {
            return res.status(404).json({success: false,  message: 'User not found' });
        }
        res.status(200).json({success: true, data: user});
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update user', error });
    }
};

const deleteUser = async (req, res) => {
    try {
        const success = await userService.deleteUser(req.params.id);
        if (!success) {
            return res.status(404).json({success: false,  message: 'User not found' });
        }
        res.status(200).json({success: true,  message: 'User deleted successfully' });
    } catch (error) {
        us(500).json({success: false, message: 'Failed to delete user', error });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
