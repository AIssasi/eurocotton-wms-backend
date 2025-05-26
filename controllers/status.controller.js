import { State } from '#models/index';
import ErrorResponse from '#utils/errorResponse';
import successHandler from '#middleware/success/successHandler.middleware';
import { Op } from 'sequelize';
import { body, param, validationResult } from 'express-validator';

export const createStatus = [
  // Validación y sanitización
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),

  async (req, res, next) => {
    // Validación de los datos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse('Validation fields', errors.array(), 400));
    }

    try {
      const { name: name_status, description: description_status } = req.body;
      const exisitsStatus = await State.findOne({
        where: { [Op.or]: [{ name_status }, { description_status }] },
      });
      if (exisitsStatus) {
        return next(new ErrorResponse('Status already exists', exisitsStatus.id_status, 400));
      }
      const newStatus = await State.create({ name_status, description_status });
      return successHandler(req, res, 'Status created successfully', newStatus, 201);
    } catch (err) {
      return next(err);
    }
  },
];

export const updateStatus = [
  body('name').trim().notEmpty().withMessage('Name is required'),
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
      const status = await State.findByPk(id);

      if (!status) {
        return next(new ErrorResponse('Status not found', null, 404));
      }

      status.name_status = name;
      status.description_status = description;

      await status.save();
      return successHandler(req, res, 'Status updated successfully', status, 201);
    } catch (err) {
      return next(err);
    }
  },
];

export const deleteStatus = [
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
      const status = await State.findByPk(id);

      if (!status) {
        return next(new ErrorResponse('Status not found', null, 401));
      }

      await status.destroy();
      return successHandler(req, res, 'Status deleted successfully', status.id_status, 200);
    } catch (err) {
      return next(err);
    }
  },
];

export const getAllStatus = [
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse('Validation fields', errors.array(), 400));
    }

    try {
      const status = await State.findAll({
        attributes: ['id_status', 'description_status'],
      });
      if (!status.length) {
        return next(new ErrorResponse('Status not found', null, 401));
      }
      return successHandler(req, res, 'Status retreived successfully', status, 200);
    } catch (err) {
      return next(err);
    }
  },
];

export const getStatusById = [
  param('id')
    .notEmpty()
    .withMessage('Id is required')
    .isInt({ min: 1 })
    .withMessage('Id must be a positive integer'),

  async (req, res, next) => {
    const { id } = req.params;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(new ErrorResponse('Validation fields', errors.array(), 400));
    }
    try {
      const status = await State.findByPk(id, {
        attributes: ['id_status', 'name_status', 'description_status', 'created_at', 'updated_at'],
      });
      if (!status) {
        return next(new ErrorResponse('Status not found', null, 404));
      }
      return successHandler(req, res, 'Status retrieved successfully', status, 200);
    } catch (err) {
      return next(err);
    }
  },
];
