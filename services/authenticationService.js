const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET;

const registerUser = async (name, email, password, role) => {
  try {
    const user = await User.create({
      name,
      email,
      password,
      role,
    });
    return user;
  } catch (error) {
    throw new Error('Error during user registration');
  }
};

const loginUser = async (email, password) => {
    try {
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        throw new Error('User not found');
      }
  
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }
  
      // Update last_time_online to the current time
      user.last_time_online = new Date();
      await user.save();
  
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: '1h',
      });
  
      return { user, token };
    } catch (error) {
      throw new Error(error.message);
    }
  };
  

module.exports = {
  registerUser,
  loginUser,
};
