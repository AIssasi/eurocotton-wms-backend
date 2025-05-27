import { getEnv } from '#config/environment';
const env = getEnv();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import { User, RolePerm } from '#models/index';
import ErrorResponse from '#utils/errorResponse';
import successHandler from '#middleware/success/successHandler.middleware';
import { body, validationResult } from 'express-validator';

const { NODE_ENV } = env;
const { JWT_SECRET, JWT_SECRET_REFRESH } = process.env;

export const register = [
  body('username').trim().notEmpty().withMessage('Name is required'),
  body('password').trim().notEmpty().withMessage('Passwors is required'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('You must provide a valid email.'),
  body('role')
    .notEmpty()
    .withMessage('Role is required')
    .isInt({ min: 1 })
    .withMessage('Role must be a positive integer'),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse('Validation fields', errors.array(), 400));
    }

    try {
      const { username, email, password, role } = req.body;
      const existingUser = await User.findOne({
        where: { [Op.or]: [{ username_user: username }, { email_user: email }] },
        paranoid: false,
      });
      if (existingUser) {
        return next(new ErrorResponse('Username or email already exists', null, 400));
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        username_user: username,
        password_user: hashedPassword,
        email_user: email,
        role_user: role,
      });
      return successHandler(req, res, 'User registered successfully', newUser.id_user, 201);
    } catch (err) {
      return next(err);
    }
  },
];

export const token = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('You must provide a valid email.'),
  body('password').trim().notEmpty().withMessage('Password is required'),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse('Validation fields', errors.array(), 400));
    }

    try {
      const { email, password } = req.body;
      const existingUser = await User.findOne({
        where: { email_user: email },
        raw: true,
        paranoid: false,
      });
      if (!existingUser) {
        return next(new ErrorResponse('Invalid email or password', null, 401));
      }
      const isPasswordValid = await bcrypt.compare(password, existingUser.password_user);

      if (!isPasswordValid) {
        return next(new ErrorResponse('Invalid email or password', null, 401));
      }
      if (!existingUser.isactive_user) {
        return next(
          new ErrorResponse(
            'Your account is inactive. Please contact support to resolve this issue.',
            null,
            403
          )
        );
      }

      const rolePermissionsResponse = await RolePerm.findAll({
        where: { role_roleperm: existingUser.role_user },
        attributes: ['permission_roleperm'],
        raw: true,
      });
      const permissionsCollection = [];

      for (const permission of rolePermissionsResponse) {
        permissionsCollection.push(permission.permission_roleperm);
      }
      const payload = {
        user: {
          id: existingUser.id_user,
          username: existingUser.username_user,
          role: [existingUser.role_user], // Incluir el rol del usuario en el payload
          permissions: permissionsCollection,
        },
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1000h',
        issuer: 'issasi-api', // Establecer el emisor del token
        audience: 'issasi-api', // Establecer la audiencia del token
        keyid: JWT_SECRET, // Establecer la clave del token
      });
      return successHandler(req, res, 'Token generated', token, 200);
    } catch (err) {
      return next(err);
    }
  },
];

export const login = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('You must provide a valid email.'),
  body('password').trim().notEmpty().withMessage('Password is required'),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse('Validation fields', errors.array(), 400));
    }

    try {
      const { email, password } = req.body;
      const existingUser = await User.findOne({
        where: { email_user: email },
        raw: true,
        paranoid: false,
      });
      if (!existingUser) {
        return next(new ErrorResponse('Invalid email or password', null, 401));
      }
      const isPasswordValid = await bcrypt.compare(password, existingUser.password_user);

      if (!isPasswordValid) {
        return next(new ErrorResponse('Invalid email or password', null, 401));
      }
      if (!existingUser.isactive_user) {
        return next(
          new ErrorResponse(
            'Your account is inactive. Please contact support to resolve this issue.',
            null,
            403
          )
        );
      }

      const rolePermissionsResponse = await RolePerm.findAll({
        where: { role_roleperm: existingUser.role_user },
        attributes: ['permission_roleperm'],
        raw: true,
      });
      const permissionsCollection = [];

      for (const permission of rolePermissionsResponse) {
        permissionsCollection.push(permission.permission_roleperm);
      }
      const payload = {
        user: {
          id: existingUser.id_user,
          username: existingUser.username_user,
          role: [existingUser.role_user], // Incluir el rol del usuario en el payload
          permissions: permissionsCollection,
        },
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h',
        issuer: 'issasi-api', // Establecer el emisor del token
        audience: 'issasi-api', // Establecer la audiencia del token
        keyid: JWT_SECRET, // Establecer la clave del token
      });

      const refreshToken = jwt.sign(payload, process.env.JWT_SECRET_REFRESH, {
        expiresIn: '7d',
        issuer: 'issasi-api', // Establecer el emisor del token
        audience: 'issasi-api', // Establecer la audiencia del token
        keyid: JWT_SECRET_REFRESH, // Establecer la clave del token
      });
      res.cookie('accessToken', token, {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        sameSite: NODE_ENV === 'production' ? 'None' : 'Strict',
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        sameSite: NODE_ENV === 'production' ? 'None' : 'Strict',
      });

      return successHandler(req, res, 'Login successfull', null, 200);
    } catch (err) {
      return next(err);
    }
  },
];

export const check = [
  async (req, res, next) => {
    try {
      // Verifica si el token ya fue decodificado y adjuntado al request por el middleware
      const user = req.user;
      if (!user) {
        // Si el token es inválido o el usuario no existe, devolver un estado 401 (no autorizado)
        return next(new ErrorResponse('Invalid email or password', null, 401));
      }
      // Si el usuario existe, devolver sus datos utilizando el successHandler
      return successHandler(req, res, 'User data retrieved successfully', { user }, 200);
    } catch (error) {
      // Si hay algún error durante la verificación, responder con un error 500 (error del servidor)
      return next(new ErrorResponse('Error en el servidor', error, 500));
    }
  },
];

export const logout = [
  async (req, res, next) => {
    try {
      // Eliminar cookies de los tokens
      res.cookie('accessToken', '', {
        httpOnly: false,
        secure: NODE_ENV === 'production',
        sameSite: NODE_ENV === 'production' ? 'None' : 'Strict',
        expires: new Date(0), // Establecer la cookie para que expire inmediatamente
      });

      res.cookie('refreshToken', '', {
        httpOnly: false,
        secure: NODE_ENV === 'production',
        sameSite: NODE_ENV === 'production' ? 'None' : 'Strict',
        expires: new Date(0), // Establecer la cookie para que expire inmediatamente
      });
      // Responder con éxito usando el successHandler
      return successHandler(req, res, 'Successfully logged out', null, 200);
    } catch (error) {
      // En caso de error, usar el ErrorResponse para manejar el error
      return next(new ErrorResponse('Server error', error, 500));
    }
  },
];
