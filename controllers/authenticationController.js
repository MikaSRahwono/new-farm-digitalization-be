const { registerUser, loginUser } = require('../services/authenticationService');

const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const user = await registerUser(name, email, password, role);
    res.status(201).json({ success: true, message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { user, token } = await loginUser(email, password);
    res.status(200).json({ success: true, message: 'Login successful', user, token });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  register,
  login,
};
