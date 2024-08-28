// controllers/rolesController.js

const Color = require('@models/Color');
const successHandler = require('@middleware/success/successHandler.middleware');
const ErrorResponse = require('@utils/errorResponse');
const { body, param, validationResult } = require('express-validator');

exports.createColor = [
  // Validación y sanitización
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('code').trim().notEmpty().withMessage('Code is required'),

  async (req, res, next) => {
    // Validación de los datos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse('Validation failed', errors.array(), 400));
    }

    try {
      // Desestructuración de datos
      const { name, description, code } = req.body;

      // Verificar existencia de color por codigo
      const existingColor = await Color.findOne({
        where: {
          code_color: code,
        },
      });
      if (existingColor) {
        return next(
          new ErrorResponse('Color with this code already exists', existingColor.id_color, 409)
        );
      }

      // Crear nuevo color con mapeo explícito de columnas
      const newColor = await Color.create({
        name_color: name,
        description_color: description,
        code_color: code,
      });

      // Responder con éxito
      return successHandler(req, res, 'Color created successfully.', newColor, 201);
    } catch (error) {
      // Manejar errores de la base de datos y otros errores inesperados
      return next(error);
    }
  },
];
exports.updateColor = [
  // Validación y sanitización
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('code').trim().notEmpty().withMessage('Code is required'),
  param('id')
    .notEmpty()
    .withMessage('Id color is required')
    .isInt({
      min: 1,
    })
    .withMessage('Id must be a positive integer'),

  async (req, res, next) => {
    // Validación de los datos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse('Validation failed', errors.array(), 400));
    }

    try {
      // Desestructuración de datos
      const { name, description, code } = req.body;
      const colorId = req.params.id;

      const color = await Color.findByPk(colorId);
      if (!color) {
        return next(new ErrorResponse('Color not found', null, 404));
      }

      // Actualizar los campos del color
      color.name_color = name;
      color.description_color = description;
      color.code_color = code;

      // Guardar los cambios en la base de datos
      await color.save();

      // Responder con éxito
      return successHandler(req, res, 'Color updated successfully', color, 200);
    } catch (error) {
      // Manejar errores de la base de datos y otros errores inesperados
      return next(error);
    }
  },
];
exports.deleteColor = [
  param('id')
    .notEmpty()
    .withMessage('Id color is required')
    .isInt({
      min: 1,
    })
    .withMessage('Id must be a positive integer'),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse('Validation fields', errors.array(), 400));
    }
    try {
      const { id } = req.params;
      const color = await Color.findByPk(id);
      if (!color) {
        return next(new ErrorResponse('Color not found', null, 404));
      }
      await color.destroy();
      return successHandler(req, res, 'Color deleted successfully', color.id_color, 200);
    } catch (err) {
      return next(err);
    }
  },
];
exports.getAllColors = [
  async (req, res, next) => {
    try {
      const colors = await Color.findAll({
        attributes: ['id_color', 'name_color', 'description_color', 'code_color'],
      });
      if (!colors.length) {
        return next(new ErrorResponse('Colors not found', null, 404));
      }
      return successHandler(req, res, 'Categories retrieved successfully', colors, 200);
    } catch (err) {
      return next(err);
    }
  },
];
