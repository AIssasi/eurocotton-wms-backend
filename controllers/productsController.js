const { Product } = require('../models'); // Importa el modelo Products de Sequelize
const ErrorResponse = require('../utils/errorResponse');
const successHandler = require('@middleware/successHandler/successHandler.middleware')
const { body, validationResult } = require('express-validator');

exports.createProduct = [
  // Validación y sanitización
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('sku').trim().notEmpty().withMessage('SKU is required'),
  body('brand').trim().notEmpty().withMessage('Brand is required').isInt({ min: 0 }).withMessage('Brand must be a positive integer'),
  body('category').trim().notEmpty().withMessage('Category is required').isInt({ min: 0 }).withMessage('Category must be a positive integer'),
  body('composition').trim().notEmpty().withMessage('Composition is required').isInt({ min: 0 }).withMessage('Composition must be a positive integer'),
  body('color').trim().notEmpty().withMessage('Color is required').isInt({ min: 0 }).withMessage('Color must be a positive integer'),
  body('weight').trim().notEmpty().withMessage('Weight is required').isFloat({ gt: 0 }).withMessage('Weight must be a positive number'),
  body('status').trim().notEmpty().withMessage('Status is required').isInt({ min: 0 }).withMessage('Status must be a positive integer'),

  async (req, res, next) => {
    // Validación de los datos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse('Validation fields', errors.array(), 400));
    }

    try {
      // Desestructuración de datos con nombres consistentes
      const { name : name_product, description: description_product, sku: sku_product, brand: brand_product, category: category_product, composition: composition_product, color: color_product, weight: weight_product, status: status_product } = req.body;

      // Verificar existencia de producto
      const existingProduct = await Product.findOne({ where: { sku_product } });
      if (existingProduct) {
        return next(new ErrorResponse('Product code already exists', existingProduct, 400));
      }

      // Crear nuevo producto
      const newProduct = await Product.create({
        name_product,
        description_product,
        sku_product,
        brand_product,
        category_product,
        composition_product,
        color_product,
        weight_product,
        status_product,
      });

      // Responder con éxito
      return successHandler(req, res, 'All products retrieved successfully.', newProduct, 201);
    } catch (err) {
      return next(err);
    }
  }
];


exports.getAllProducts = async (req, res, next) => {
  try {
    const productData = await Product.findAll({
      attributes: ['id_product', 'name_product', 'description_product', 'sku_product', 'brand_product', 'category_product', 'composition_product', 'color_product', 'weight_product', 'status_product', 'created_at', 'updated_at'], 
      // where: { status: 'active' }, 
      // order: [['createdAt', 'DESC']],
    });
    if (!productData.length) {
      return next(new ErrorResponse('No products found', 404));
    }
    return successHandler(req, res, productData, 'All products retrieved successfully.');
  } catch (err) {
    return next(err);
  }
};