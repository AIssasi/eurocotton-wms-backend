import { QuickEntry } from '#models/index';
import ErrorResponse from '#utils/errorResponse';
import successHandler from '#middleware/success/successHandler.middleware';
import { body, param, validationResult } from 'express-validator';
import { PackingFactor } from '#models/index';

export function createQuickentry() {
  return [
    body('sku_quick').trim().notEmpty().isInt().withMessage('sku_quick is required'),
    body('colour_quick').trim().notEmpty().withMessage('colour_quick is required'),
    body('size_quick').trim().notEmpty().withMessage('size_quick is required'),
    body('pallet_number_quick')
      .isInt({ min: 1 })
      .withMessage('pallet_number_quick must be a positive integer'),

    async (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(new ErrorResponse('Validation failed', errors.array(), 400));
      }

      try {
        const { sku_quick, colour_quick, size_quick, pallet_number_quick } = req.body;

        const newQuick = await QuickEntry.create({
          sku_quick: sku_quick,
          colour_quick: colour_quick,
          size_quick: size_quick,
          pallet_number_quick: pallet_number_quick,
        });

        return successHandler(req, res, 'Quick Entry created successfully', newQuick, 201);
      } catch (error) {
        console.log(error);
        return next(error);
      }
    },
  ];
}

export function getAllQuickentry() {
  return [
    async (req, res, next) => {
      try {
        const quick = await QuickEntry.findAll({
          attributes: [
            'id_quick',
            'sku_quick',
            'colour_quick',
            'size_quick',
            'pallet_number_quick',
            'created_at',
          ],
          include: [
            {
              model: PackingFactor,
              as: 'quickentry',
              attributes: [
                'id_factor_empaque',
                'factor_empaque',
                'factor_description',
                'created_at',
              ],
            },
          ],
        });
        if (!quick.length) {
          return next(new ErrorResponse('Quick not found', null, 404));
        }
        return successHandler(req, res, 'Quick retrieved successfully', quick, 200);
      } catch (err) {
        return next(err);
      }
    },
  ];
}

export function deleteEntry() {
  return [
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
        const entry = await QuickEntry.findByPk(id);

        if (!entry) {
          return next(new ErrorResponse('QuickEntry not found', null, 404));
        }

        await entry.destroy();
        return successHandler(req, res, 'Quick entry delete successfully', entry.id_quick, 200);
      } catch (err) {
        return next(err);
      }
    },
  ];
}
