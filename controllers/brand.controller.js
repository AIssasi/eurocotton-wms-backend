import { Brand } from '#models/index';
import ErrorResponse from '#utils/errorResponse';
import successHandler from '#middleware/success/successHandler.middleware';
import { body, param, validationResult } from 'express-validator';

export const createBrand = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse('Validation fields', errors.array(), 400));
    }

    const { name: name_brand, description: description_brand, status: status_brand } = req.body;

    try {
      const exisitsBrand = await Brand.findOne({
        where: { name_brand },
      });

      if (exisitsBrand) {
        return next(new ErrorResponse('Brand already exists', exisitsBrand.id_brand, 400));
      }

      const brand = await Brand.create({
        name_brand,
        description_brand,
        status_brand,
      });

      return successHandler(req, res, 'Brand created successfully', brand, 201);
    } catch (err) {
      return next(err);
    }
  },
];

export const updateBrand = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isInt({ min: 1 })
    .withMessage('Status must be a positive integer'),
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
      const { name, description, status } = req.body;
      const brand = await Brand.findByPk(id);

      if (!brand) {
        return next(new ErrorResponse('Brand not found', null, 404));
      }

      brand.name_brand = name;
      brand.description_brand = description;
      brand.status_brand = status;

      await brand.save();
      return successHandler(req, res, 'Brand updated successfully', brand, 200);
    } catch (err) {
      return next(err);
    }
  },
];

export const deleteBrand = [
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
      const brand = await Brand.findByPk(id);

      if (!brand) {
        return next(new ErrorResponse('Brand not found', null, 404));
      }
      await brand.destroy();
      return successHandler(req, res, 'Brand deleted successfully', brand.id_brand, 200);
    } catch (err) {
      return next(err);
    }
  },
];

export const getAllBrands = [
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse('Validation fields', errors.array(), 400));
    }
    try {
      const brands = await Brand.findAll({
        attributes: ['id_brand', 'name_brand', 'description_brand', 'status_brand'],
      });

      if (!brands.length) {
        return next(new ErrorResponse('Brands not found', null, 404));
      }
      return successHandler(req, res, 'Brands retrieved successfully', brands, 200);
    } catch (err) {
      return next(err);
    }
  },
];

export const getBrandById = [
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
      const brand = await Brand.findByPk(id, {
        attributes: ['id_brand', 'name_brand', 'description_brand', 'status_brand'],
      });
      if (!brand) {
        return next(new ErrorResponse('Brand not found', null, 404));
      }
      return successHandler(req, res, 'Brand retrieved successfully', brand, 200);
    } catch (err) {
      return next(err);
    }
  },
];
