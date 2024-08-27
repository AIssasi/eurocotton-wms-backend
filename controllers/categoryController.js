const { Category } = require('../models');
const successHandler = require('../middleware/successHandler/successHandler.middleware');
const ErrorResponse = require('../utils/errorResponse');
const { Op } = require('sequelize');
const { body,param, validationResult } = require('express-validator');

exports.createCategory = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    async (req, res, next) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return next(new ErrorResponse('Validation fields', errors.array(), 400));
        }

            try {
                const {name : name_category, description: description_category, status: status_category} = req.body;
                const exisitsCategory = await Category.findOne({
                    where: {[Op.or]: [{name_category}]}
                });

                if (exisitsCategory) {
                    return next(new ErrorResponse('Category already exists',exisitsCategory.id_category, 400));
                }

                const category = await Category.create({
                    name_category,
                    description_category,
                    status_category
                });

            return successHandler(req, res, category.id_category, 'Category created successfully',201);
            } catch (err) {
                return next(err);
            }
    }
];

exports.updateCategory = [
    
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    param('id').notEmpty().withMessage('Id is required').isInt({min:1}).withMessage('Id must be a positive integer'),

    async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse('Validation fields', errors.array(), 400));
    }

  
        try{
            let idCategory = req.params.id;
            idCategory = parseInt(idCategory);
            const {name, description} = req.body;
            const category = await Category.findByPk(idCategory);

            if(!category){
                return next(new ErrorResponse('Validation fields', errors.array(), 404));
            }

            category.name_category = name;
            category.description_category = description;

            await category.save();
            return successHandler(req, res,'Category updated successfully', category.category_status, 201);
        }catch(err){
            return next(err);
        }

}
];

exports.deleteCategory = [
    param('id').notEmpty().withMessage('Id is required').isInt({min:1}).withMessage('Id must be a positive integer'),

    async(req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return next(new ErrorResponse('Validation fields', errors.array(), 400));
        }

            try{
                let categoryId = req.params.id;
                categoryId = parseInt(categoryId);

                const category = await Category.findByPk(categoryId);

                if(!category){
                    return next(new ErrorResponse('Validation fields', errors.array(),404));
                }

                await category.destroy();
                return successHandler(req, res,'Category deleted successfully', category.id_category, 200 );
            }catch(err){
                return next(err);
            }
       
        
    }
];

exports.getAllCategories = [
 async(req, res, next) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return next(new ErrorResponse('Validation fields', errors.array(), 400));
        }
    try{
        const category = await Category.findAll({
            attributes: ['id_category','name_category','description_category','status_category']
        });
        if(!category.length){
            return next(new ErrorResponse('Categories not found', 404));
        }
        return successHandler(req, res,'Categories retrieved successfully', category, 200 );
    }catch(err){
        return next(err);
    }
}
];

exports.getCategoryById = [
param('id').notEmpty().withMessage('Id is required').isInt({min:1}).withMessage('Id must be a positive integer'),

 async(req, res, next) => {
    let categoryId = req.params.id;
    categoryId = parseInt(categoryId);
  
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return next(new ErrorResponse('Validation fields', errors.array(), 400));
        }

      try{
        const category = await Category.findByPk(categoryId,{ attributes:  ['id_category','name_category','description_category','status_category']});
        if(!category){
            return next(new ErrorResponse('Validation fields', errors.array(), 404));
        }
        return successHandler(req, res, 'Category retrieved successfully', category.id_category, 200);
      }catch(err){
        return next(err);
      }
    
  }
];