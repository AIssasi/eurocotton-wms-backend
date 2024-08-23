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
    successHandler(req, res, next, 'Logged out successfully');
  } catch (err) {
    next(err);
  }
  
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({ attributes: ['id_user', 'username_user'] });
    
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
    successHandler(req, res,user.id_user, 'User deleted successfully');
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId, { attributes: ["id_user", 'username_user', 'email_user', 'role_user', 'isactive_user', 'created_at', 'updated_at']});
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
      successHandler(req, res, user.id_user, 'Encrypted password updated successfully');
    } catch (err) {
      next(err);
    }
  }else{
    return next(new ErrorResponse("newPassword are required fields",401))
  }

  
};

exports.createUser = async (req, res, next) => {
  
  try{
      const { username, password, email, role } = req.body;
      console.log('body',req.body)
      const exisitsUser = await User.findOne({ where: {[Op.or]: [{ username_user: username }, { email_user: email }] } });
        if(exisitsUser){
          return next(new ErrorResponse('Username or email already exists', 400));
        }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ username_user: username, password_user: hashedPassword, email_user: email, role_user: role});
      successHandler(req, res, newUser.id_user, 'User created successfully');

      } catch(err) {
        next(err);
    }

}
