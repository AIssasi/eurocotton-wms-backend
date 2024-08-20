const bcrypt = require('bcryptjs');
const { User } = require('../models'); // Importa el modelo User de Sequelize
const ErrorResponse = require('../utils/errorResponse');
const successHandler = require('../middleware/successHandler/successHandler.middleware');


exports.getProfile = (req, res, next) => {
  try {
    const { id } = req.user;
    const profile = { id };
    res.status(200).json({ success: true, data: profile });
  } catch (err) {
    next(err);
  }
};

exports.logout = (req, res, next) => {
  try {
    // No action needed for JWT
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (err) {
    next(err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({ attributes: ['id_user', 'username_user'] });
    // return res.status(200).json({ success: true, data: users });
    successHandler(req, res, users, 'Users retrieved successfully');
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return next(new ErrorResponse('User not found', 404));
    }
    await user.destroy();
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return next(new ErrorResponse('User not found', 404));
    }
    successHandler(req, res, user, 'User retrieved successfully');
  } catch (err) {
    next(err);
  }
};

exports.updateEncryptedPassword = async (req, res, next) => {
  const userId = req.params.id;
  const { newPassword } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const user = await User.findByPk(userId);
    if (!user) {
      return next(new ErrorResponse('User not found', 404));
    }
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ success: true, message: 'Encrypted password updated successfully' });
  } catch (err) {
    next(err);
  }
};
