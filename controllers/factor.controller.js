import ErrorResponse from '#utils/errorResponse';
import successHandler from '#middleware/success/successHandler.middleware';
import { body, validationResult } from 'express-validator';
import { PackingFactor } from '#models/index';

export function createPackingFactor() {
  return [
    body('factor_empaque').trim().notEmpty().withMessage('Factor packing is required'),
    body('factor_description').trim().notEmpty().withMessage('Factor packing is required'),

    async (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(new ErrorResponse('Validation failed', errors.array(), 400));
      }

      try {
        const { factor_empaque, factor_description } = req.body;

        const newFactor = await PackingFactor.create({
          factor_empaque: factor_empaque,
          factor_description: factor_description,
        });

        return successHandler(req, res, 'Factor empacking created successfully', newFactor, 201);
      } catch (error) {
        return next(error);
      }
    },
  ];
}

export function getAllPackingFactor() {
  return [
    async (req, res, next) => {
      try {
        const packing = await PackingFactor.findAll({
          attributes: ['id_factor_empaque', 'factor_empaque', 'factor_description', 'created_at'],
        });
        if (!packing.length) {
          return next(new ErrorResponse('Packing Factor not found', null, 404));
        }
        return successHandler(req, res, 'Packing Factor retrieved successfully', packing, 200);
      } catch (err) {
        return next(err);
      }
    },
  ];
}
