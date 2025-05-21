import { Category } from '#models/index';
import successHandler from '#middleware/success/successHandler.middleware';
import ErrorResponse from '#utils/errorResponse';
import { Op } from 'sequelize';
import { body, param, validationResult } from 'express-validator';

export function createCategory() {
  return [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),

    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new ErrorResponse('Validation fields', errors.array(), 400));
      }

      try {
        const {
          name: name_category,
          description: description_category,
          status: status_category,
        } = req.body;
        const exisitsCategory = await Category.findOne({ where: { [Op.or]: [{ name_category }] } });

        if (exisitsCategory) {
          return next(
            new ErrorResponse('Category already exists', exisitsCategory.id_category, 400)
          );
        }

        const category = await Category.create({
          name_category,
          description_category,
          status_category,
        });

        return successHandler(req, res, 'Category created successfully', category, 201);
      } catch (err) {
        return next(err);
      }
    },
  ];
}

export function updateCategory() {
  return [
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
        const category = await Category.findByPk(id);

        if (!category) {
          return next(new ErrorResponse('Category not found', null, 404));
        }

        category.name_category = name;
        category.description_category = description;
        category.status_category = status;

        await category.save();
        return successHandler(req, res, 'Category updated successfully', category, 200);
      } catch (err) {
        return next(err);
      }
    },
  ];
}

export function deleteCategory() {
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
        const category = await Category.findByPk(id);

        if (!category) {
          return next(new ErrorResponse('Category not found', null, 404));
        }

        await category.destroy();
        return successHandler(req, res, 'Category deleted successfully', category.id_category, 200);
      } catch (err) {
        return next(err);
      }
    },
  ];
}

export function getAllCategories() {
  return [
    async (req, res, next) => {
      try {
        const categories = await Category.findAll({
          attributes: ['id_category', 'name_category', 'description_category', 'status_category'],
        });
        if (!categories.length) {
          return next(new ErrorResponse('Categories not found', null, 404));
        }
        return successHandler(req, res, 'Categories retrieved successfully', categories, 200);
      } catch (err) {
        return next(err);
      }
    },
  ];
}

export function getCategoryById() {
  return [
    param('id')
      .notEmpty()
      .withMessage('Id is required')
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
        const category = await Category.findByPk(id, {
          attributes: ['id_category', 'name_category', 'description_category', 'status_category'],
        });
        if (!category) {
          return next(new ErrorResponse('Category not found', null, 404));
        }
        return successHandler(req, res, 'Category retrieved successfully', category, 200);
      } catch (err) {
        return next(err);
      }
    },
  ];
}
