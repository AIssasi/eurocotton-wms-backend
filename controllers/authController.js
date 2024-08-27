const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { User, RolePerm } = require('../models');
const ErrorResponse = require('../utils/errorResponse');
const successHandler = require('../middleware/successHandler/successHandler.middleware');


const {
  JWT_SECRET
} = process.env;

exports.register = async (req, res, next) => {

  try {
    const { username, password, email, role } = req.body;
    const existingUser = await User.findOne({ where: { [Op.or]: [{ username_user : username }, { email_user : email }] }, paranoid : false });
    if (existingUser) {
      return next(new ErrorResponse('Username or email already exists', null, 400));
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username_user : username, password_user: hashedPassword, email_user : email, role_user : role });
    return successHandler(req, res, 'User registered successfully', newUser.id_user, 201);
  } catch (err) {
    return next(err);
  }
};

exports.token = async (req, res, next) => {
    
    try {


    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorResponse('Email and password are required fields', null, 401));
    }

    const user = await User.findOne({ where: { email_user : email }, raw: true});
    if (!user) {
      return next(new ErrorResponse('Invalid email or password', null,  401));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_user);

    if (!isPasswordValid) {
      return next(new ErrorResponse('Invalid email or password', null, 401));
    }

    if(!user.isactive_user){
      return next(new ErrorResponse('Your account is inactive. Please contact support to resolve this issue.', null, 403));
    }
    const rolePermissionsResponse = await RolePerm.findAll({ where: { 'role_roleperm': user.role_user }, attributes:['permission_roleperm'], raw: true});
    const permissionsCollection = []

    for (const permission of rolePermissionsResponse) {
      permissionsCollection.push(permission.permission_roleperm)
    }

    const payload = {
      user: {
        id: user.id_user,
        username: user.username_user,
        role: [user.role_user], // Incluir el rol del usuario en el payload
        permissions: permissionsCollection
      }
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1000h',
      issuer: 'issasi-api', // Establecer el emisor del token
      audience: 'issasi-api', // Establecer la audiencia del token
      keyid: JWT_SECRET // Establecer la clave del token
    });
    return successHandler(req, res, 'Token generated', token, 200);
    //res.json({ token });

  } catch (err) {

    return next(err);

  }
};
