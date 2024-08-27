const {
    Brand
} = require('../models');
const ErrorResponse = require('../utils/errorResponse');
const successHandler = require('../middleware/successHandler/successHandler.middleware');
const { body,param, validationResult } = require('express-validator');

exports.createBrand = [
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
                where:  {name_brand }});

            if (exisitsBrand) {
                return next(new ErrorResponse('Brand already exists', exisitsBrand.id_brand, 400));
            }

            const brand = await Brand.create({
                name_brand,
                description_brand,
                status_brand
            });

           return successHandler(req, res,'Brand created successfully', brand.id_brand, 201

            );
        } catch (err) {
           return next(err);
        }

    }
];

exports.updateBrand = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    param('id').notEmpty().withMessage('Id is required').isInt({min:1}).withMessage('Id must be a positive integer'),

    async (req, res, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse('Validation fields', errors.array(), 400));
    }

        try{
            let idBrand = req.params.id;
            idBrand = parseInt(idBrand);
        
            const {name, description} = req.body;
            const brand = await Brand.findByPk(idBrand);

            if(!brand){
                return next(new ErrorResponse('Validation fields', errors.array() ,404));
            }

            brand.name_brand = name;
            brand.description_brand = description;

            await brand.save();
           return successHandler(req, res, 'Brand updated successfully', brand.id_brand, 200);
        }catch(err){
           return  next(err);
        }
  
}
];

exports.deleteBrand =[ 
param('id').notEmpty().withMessage('Id is required').isInt({min:1}).withMessage('Id must be a positive integer'),

async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse('Validation fields', errors.array(), 400));
    }
    try{
            
        let brandId = req.params.id;
        brandId = parseInt(brandId);
        const brand = await Brand.findByPk(brandId);
        if(!brandId){
            return next(new ErrorResponse('Validation fields', errors.array(), 404));
        }
        await brand.destroy();
        return successHandler(req, res, 'Brand deleted successfully', brand.id_brand, 200);
    }catch(err){
        return next(err);
    }
   
}

];

exports.getAllBrands = [ 

async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse('Validation fields', errors.array(), 400));
    }
    try{
        const brands = await Brand.findAll({
            attributes:['id_brand', 'name_brand', 'description_brand', 'status_brand']
        });

        if(!brands.length){
            return next(new ErrorResponse('Validation fields', errors.array(), 404));
        }
            return successHandler(req, res, 'Brands retrieved successfully', brands, 200);
    }catch(err){
        return next(err);
    }
}
];

exports.getBrandById = [ 
    param('id').notEmpty().withMessage('Id is required').isInt({min:1}).withMessage('Id must be a positive integer'),

    async (req, res, next) =>{

    let brandId = req.params.id;
    brandId = parseInt(brandId);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse('Validation fields', errors.array(), 400));
    }
        try{
            const brand = await Brand.findByPk(brandId,{ attributes: ['id_brand', 'name_brand', 'description_brand', 'status_brand']});
            if(!brand){
                return next(new ErrorResponse('Validations fields', errors.array(), 404));
            }
            return successHandler(req, res, 'Brand retrieved successfully', brand.id_brand, 200);
        }catch(err){
            return next(err);
        }
}
];