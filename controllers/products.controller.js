import { Product } from '#models/index';
import ErrorResponse from '#utils/errorResponse';
import successHandler from '#middleware/success/successHandler.middleware';
import { body, param, validationResult } from 'express-validator';

export function createProduct() {
  return [
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
            new ErrorResponse(
              'Product with this SKU already exists',
              existingProduct.id_product,
              409
            )
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
}

export function updateProduct() {
  return [
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
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new ErrorResponse('Validation fields', errors.array(), 400));
      }

      try {
        const { id } = req.params;
        const { name, description, sku, brand, category, composition, color, weight, status } =
          req.body;
        const product = await Product.findByPk(id);

        if (!product) {
          return next(new ErrorResponse('Product not found', null, 404));
        }

        product.name_product = name;
        product.description_product = description;
        product.sku_product = sku;
        product.brand_product = brand;
        product.category_product = category;
        product.composition_product = composition;
        product.color_product = color;
        product.weight_product = weight;
        product.status_product = status;

        await product.save();
        return successHandler(req, res, 'Product update successfully', product, 201);
      } catch (err) {
        return next(err);
      }
    },
  ];
}

export function deleteProduct() {
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
        const product = await Product.findByPk(id);

        if (!product) {
          return next(new ErrorResponse('Product not found', null, 404));
        }

        await product.destroy();
        return successHandler(req, res, 'Product deleted successfully', product.id_product, 200);
      } catch (err) {
        return next(err);
      }
    },
  ];
}

export function getAllProducts() {
  return [
    async (req, res, next) => {
      try {
        const products = await Product.findAll({
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
          ],
        });
        if (!products.length) {
          return next(new ErrorResponse('Products not found', null, 404));
        }
        return successHandler(req, res, 'Products retrieved succesfully', products, 200);
      } catch (err) {
        return next(err);
      }
    },
  ];
}

export function getProductById() {
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
        const product = await Product.findByPk(id, {
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
          ],
        });
        if (!product) {
          return next(new ErrorResponse('Product not found', null, 404));
        }
        return successHandler(req, res, 'Product retrieved successfully', product, 200);
      } catch (err) {
        return next(err);
      }
    },
  ];
}
