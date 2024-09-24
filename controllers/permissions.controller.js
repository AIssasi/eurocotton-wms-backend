const Permission = require('@models/Permission');
const successHandler = require('@middleware/success/successHandler.middleware');
const ErrorResponse = require('@utils/errorResponse');
const { body, param, validationResult } = require('express-validator');

exports.createPermission = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse('Validation fields', errors.array(), 400));
    }

    try {
      const { name: name_permission, description: description_permission } = req.body;

      const existingPermission = await Permission.findOne({ where: { name_permission } });
      if (existingPermission) {
        return next(new ErrorResponse('The permission already exists', existingPermission, 400));
      }

      const permission = await Permission.create({ name_permission, description_permission });

      return successHandler(req, res, 'Permission created successfully', permission, 201);
    } catch (error) {
      return next(error);
    }
  },
];

exports.updatePermission = [
  body('name').trim().notEmpty().withMessage('Names is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  param('id')
    .notEmpty()
    .withMessage('Id is required')
    .isInt({ min: 1 })
    .withMessage('Id must be a positive integer'),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse('Validation fields', errors.array(), 400));
    }

    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const permission = await Permission.findByPk(id);

      if (!permission) {
        return next(new ErrorResponse('Permission not found', null, 404));
      }

      permission.name_permission = name;
      permission.description_permission = description;

      await permission.save();
      return successHandler(req, res, 'Permission updated successfully', permission, 200);
    } catch (error) {
      return next(error);
    }
  },
];

exports.deletePermission = [
  param('id')
    .notEmpty()
    .withMessage('Id is required')
    .isInt({ min: 1 })
    .withMessage('Id must be a positive integer'),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse('Validation fields', errors.array(), 400));
    }

    try {
      const { id } = req.params;
      const permissions = await Permission.findByPk(id);

      if (!permissions) {
        return next(new ErrorResponse('Permission not found', null, 404));
      }

      await permissions.destroy();
      return successHandler(req, res, 'deleted successfully', permissions.id_permission, 200);
    } catch (error) {
      return next(error);
    }
  },
];

exports.getAllPermissions = [
  async (req, res, next) => {
    try {
      const permissions = await Permission.findAll({
        attributes: ['id_permission', 'name_permission', 'description_permission'],
      });
      if (!permissions.length) {
        return next(new ErrorResponse('Permissions not found', null, 404));
      }
      return successHandler(req, res, 'Permissions retrieved successfully', permissions, 200);
    } catch (err) {
      return next(err);
    }
  },
];
exports.getPermissionById = [
  param('id')
    .notEmpty()
    .withMessage('Id is required')
    .isInt({ min: 1 })
    .withMessage('Id must be a positive integer'),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse('Validation fields', errors.array(), 400));
    }

    try {
      const { id } = req.params;
      const permissions = await Permission.findByPk(id, {
        attributes: ['id_permission', 'name_permission', 'description_permission'],
      });

      if (!permissions) {
        return next(new ErrorResponse('Permissions not found', null, 404));
      }

      return successHandler(req, res, 'Permissions retrieved successfully', permissions, 200);
    } catch (err) {
      return next(err);
    }
  },
];
