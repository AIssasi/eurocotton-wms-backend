const { Composition } = require('../models');
const successHandler = require('../middleware/successHandler/successHandler.middleware');
const ErrorResponse = require('../utils/errorResponse');
const { body, param, validationResult } = require('express-validator');

exports.createCompositions = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse('Validation fields', errors.array(), 400));
    }
    try {
      const { name: name_composition, description: description_composition } = req.body;
      const exisitsComposition = await Composition.findOne({ where: { name_composition } });

      if (exisitsComposition) {
        return next(
          new ErrorResponse('Composition already exists', exisitsComposition.id_composition, 400)
        );
      }

      const composition = await Composition.create({ name_composition, description_composition });

      return successHandler(req, res, 'Composition created successfully', composition, 201);
    } catch (err) {
      return next(err);
    }
  },
];

exports.updateCompositions = [
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
      const composition = await Composition.findByPk(id);

      if (!composition) {
        return next(new ErrorResponse('Composition not found', null, 404));
      }

      composition.name_composition = name;
      composition.description_composition = description;

      await composition.save();
      return successHandler(req, res, 'Composition updated successfully', composition, 200);
    } catch (err) {
      return next(err);
    }
  },
];

exports.deleteCompositions = [
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
      const composition = await Composition.findByPk(id);

      if (!composition) {
        return next(new ErrorResponse('Composition not found', null, 404));
      }

      await composition.destroy();
      return successHandler(
        req,
        res,
        'Composition deleted successfully',
        composition.id_composition,
        200
      );
    } catch (err) {
      return next(err);
    }
  },
];

exports.getAllCompositions = [
  async (req, res, next) => {
    try {
      const compositions = await Composition.findAll({
        attributes: ['id_composition', 'name_composition', 'description_composition'],
      });
      if (!compositions.length) {
        return next(new ErrorResponse('Compositions not found', null, 404));
      }
      return successHandler(req, res, 'Compositions retrieved successfully', compositions, 200);
    } catch (err) {
      return next(err);
    }
  },
];

exports.getCompositionsById = [
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
      const composition = await Composition.findByPk(id, {
        attributes: ['id_composition', 'name_composition', 'description_composition'],
      });
      if (!composition) {
        return next(new ErrorResponse('Composition not found', null, 404));
      }
      return successHandler(req, res, 'Composition retrieved successfully', composition, 200);
    } catch (err) {
      return next(err);
    }
  },
];
