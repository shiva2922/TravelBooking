const User = require('../models/userModel');

const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json({
    name: user.name,
    email: user.email,
    createdAt: user.createdAt
  });
};

module.exports = { getProfile };
