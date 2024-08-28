const { Product } = require('@models'); // Importa el modelo Products de Sequelize
const ErrorResponse = require('@utils/errorResponse');
const successHandler = require('@middleware/success/successHandler.middleware');
const { body, validationResult } = require('express-validator');

exports.createProduct = [
  // Validación y sanitización
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('sku')
    .trim()
    .notEmpty()
    .withMessage('SKU is required')
    .isAlphanumeric()
    .withMessage('SKU must be alphanumeric'),
  body('brand').isInt({ min: 1 }).withMessage('Brand must be a positive integer'),
  body('category').isInt({ min: 1 }).withMessage('Category must be a positive integer'),
  body('composition').isInt({ min: 1 }).withMessage('Composition must be a positive integer'),
  body('color').isInt({ min: 1 }).withMessage('Color must be a positive integer'),
  body('weight').isFloat({ gt: 0 }).withMessage('Weight must be a positive number'),
  body('status').isInt({ min: 0 }).withMessage('Status must be a non-negative integer'),

  async (req, res, next) => {
    // Validación de los datos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse('Validation failed', errors.array(), 400));
    }

    try {
      // Desestructuración de datos
      const { name, description, sku, brand, category, composition, color, weight, status } =
        req.body;

      // Verificar existencia de producto por SKU
      const existingProduct = await Product.findOne({ where: { sku_product: sku } });
      if (existingProduct) {
        return next(
          new ErrorResponse('Product with this SKU already exists', existingProduct.id_product, 409)
        );
      }

      // Crear nuevo producto con mapeo explícito de columnas
      const newProduct = await Product.create({
        name_product: name,
        description_product: description,
        sku_product: sku,
        brand_product: brand,
        category_product: category,
        composition_product: composition,
        color_product: color,
        weight_product: weight,
        status_product: status,
      });

      // Responder con éxito
      return successHandler(req, res, 'Product created successfully.', newProduct, 201);
    } catch (error) {
      // Manejar errores de la base de datos y otros errores inesperados
      return next(error);
    }
  },
];

exports.getAllProducts = async (req, res, next) => {
  try {
    const productData = await Product.findAll({
      attributes: [
        'id_product',
        'name_product',
        'description_product',
        'sku_product',
        'brand_product',
        'category_product',
        'composition_product',
        'color_product',
        'weight_product',
        'status_product',
        'created_at',
        'updated_at',
      ],
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
