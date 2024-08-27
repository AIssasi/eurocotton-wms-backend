const bcrypt = require('bcryptjs');
const { User } = require('../models'); // Importa el modelo User de Sequelize
const ErrorResponse = require('../utils/errorResponse');
const successHandler = require('../middleware/successHandler/successHandler.middleware');
const { Op } = require('sequelize');



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
    return successHandler(req, res, 'Logged out successfully', next, 200);
  } catch (err) {
    return next(err);
  }
  
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({ attributes: ['id_user', 'username_user'] });
    
    return successHandler(req, res, 'Users retrieved successfully', users, 200);
  } catch (err) {
    return next(err);
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
    return successHandler(req, res, 'User deleted successfully', user.id_user, 200);
  } catch (err) {
    return next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId, { attributes: ["id_user", 'username_user', 'email_user', 'role_user', 'isactive_user', 'created_at', 'updated_at']});
    if (!user) {
      return next(new ErrorResponse('User not found', 404));
    }
    return successHandler(req, res, 'User retrieved successfully', user, 200);
  } catch (err) {
    return next(err);
  }
};

exports.updateEncryptedPassword = async (req, res, next) => {
  const userId = req.params.id;
  const { newPassword } = req.body;
  if(newPassword){
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
  
      const user = await User.findByPk(userId);
      if (!user) {
        return next(new ErrorResponse('User not found', 404));
      }
      user.password_user = hashedPassword;
      await user.save();
      return successHandler(req, res, 'Encrypted password updated successfully', user.id_user, 200);
    } catch (err) {
      return next(err);
    }
  }else{
    return next(new ErrorResponse("newPassword are required fields",401))
  }

  
};

exports.createUser = async (req, res, next) => {
  
  try{
      const { username, password, email, role } = req.body;
      const exisitsUser = await User.findOne({ where: {[Op.or]: [{ username_user: username }, { email_user: email }] } });
        if(exisitsUser){
          return next(new ErrorResponse('Username or email already exists', 400));
        }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ username_user: username, password_user: hashedPassword, email_user: email, role_user: role});
      return successHandler(req, res, 'User created successfully', newUser.id_user, 201);

      } catch(err) {
        return next(err);
    }

}
