const { Warehouse } = require('@models'); // Importa el modelo User de Sequelize
const ErrorResponse = require('@utils/errorResponse');
const successHandler = require('@middleware/success/successHandler.middleware');
const { body, param, validationResult } = require('express-validator');

exports.getAllWarehouses = [
  async (req, res, next) => {
    try {
      const warehouses = await Warehouse.findAll({
        attributes: [
          'id_warehouse',
          'name_warehouse',
          'description_warehouse',
          'country_warehouse',
          'postcode_warehouse',
          'street_warehouse',
          'number_warehouse',
          'state_warehouse',
          'city_warehouse',
          'capacity_warehouse',
          'status_warehouse',
          'created_at',
          'updated_at',
        ],
      });
      if (!warehouses.length) {
        return next(new ErrorResponse('Warehouses not found', null, 404));
      }
      return successHandler(req, res, 'Warehouses retrieved successfully', warehouses, 200);
    } catch (err) {
      return next(err);
    }
  },
];

exports.deleteWarehouse = [
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
      const warehouse = await Warehouse.findByPk(id);

      if (!warehouse) {
        return next(new ErrorResponse('Warehouse not found', null, 404));
      }
      await warehouse.destroy();
      return successHandler(
        req,
        res,
        'Warehouse deleted successfully',
        warehouse.id_warehouse,
        200
      );
    } catch (err) {
      return next(err);
    }
  },
];

exports.getWarehouseById = [
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
      const warehouse = await Warehouse.findByPk(id, {
        attributes: [
          'id_warehouse',
          'name_warehouse',
          'description_warehouse',
          'country_warehouse',
          'postcode_warehouse',
          'street_warehouse',
          'number_warehouse',
          'state_warehouse',
          'city_warehouse',
          'capacity_warehouse',
          'status_warehouse',
          'created_at',
          'updated_at',
        ],
      });
      if (!warehouse) {
        return next(new ErrorResponse('Warehouse not found', null, 404));
      }
      return successHandler(req, res, 'Warehouse retrieved successfully', warehouse, 200);
    } catch (err) {
      return next(err);
    }
  },
];
exports.updateWarehouse = [
  param('id')
    .notEmpty()
    .withMessage('Id is required')
    .isInt({ min: 1 })
    .withMessage('Id must be a positive integer'),
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('country').trim().notEmpty().withMessage('Country is required'),
  body('postcode')
    .notEmpty()
    .withMessage('Postcode is required')
    .isInt({
      min: 1,
    })
    .withMessage('Postcode must be a positive integer'),
  body('street').trim().notEmpty().withMessage('Street is required'),
  body('number')
    .notEmpty()
    .withMessage('Number is required')
    .isInt({
      min: 1,
    })
    .withMessage('Number must be a positive integer'),
  body('state').trim().notEmpty().withMessage('State is required'),
  body('city').trim().notEmpty().withMessage('City is required'),
  body('capacity')
    .notEmpty()
    .withMessage('Capacity is required')
    .isInt({
      min: 1,
    })
    .withMessage('Capacity must be a positive integer'),
  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isInt({
      min: 1,
    })
    .withMessage('Status must be a positive integer'),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse('Validation fields', errors.array(), 400));
    }
    try {
      const { id } = req.params;
      const {
        name,
        description,
        country,
        postcode,
        street,
        number,
        state,
        city,
        capacity,
        status,
      } = req.body;

      const warehouse = await Warehouse.findByPk(id);
      if (!warehouse) {
        return next(new ErrorResponse('Warehouse not found', null, 404));
      }
      warehouse.name_warehouse = name;
      warehouse.description_warehouse = description;
      warehouse.country_warehouse = country;
      warehouse.postcode_warehouse = postcode;
      warehouse.street_warehouse = street;
      warehouse.number_warehouse = number;
      warehouse.state_warehouse = state;
      warehouse.city_warehouse = city;
      warehouse.capacity_warehouse = capacity;
      warehouse.status_warehouse = status;
      await warehouse.save();
      return successHandler(
        req,
        res,
        'Warehouse updated successfully',
        warehouse.id_warehouse,
        200
      );
    } catch (err) {
      return next(err);
    }
  },
];

exports.createWarehouse = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('country').trim().notEmpty().withMessage('Country is required'),
  body('postcode')
    .notEmpty()
    .withMessage('Postcode is required')
    .isInt({
      min: 1,
    })
    .withMessage('Postcode must be a positive integer'),
  body('street').trim().notEmpty().withMessage('Street is required'),
  body('number')
    .notEmpty()
    .withMessage('Number is required')
    .isInt({
      min: 1,
    })
    .withMessage('Number must be a positive integer'),
  body('state').trim().notEmpty().withMessage('State is required'),
  body('city').trim().notEmpty().withMessage('City is required'),
  body('capacity')
    .notEmpty()
    .withMessage('Capacity is required')
    .isInt({
      min: 1,
    })
    .withMessage('Capacity must be a positive integer'),
  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isInt({
      min: 1,
    })
    .withMessage('Status must be a positive integer'),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse('Validation fields', errors.array(), 400));
    }

    try {
      const {
        name,
        description,
        country,
        postcode,
        street,
        number,
        state,
        city,
        capacity,
        status,
      } = req.body;
      const exisitsWarehouse = await Warehouse.findOne({
        where: { name_warehouse: name },
      });
      if (exisitsWarehouse) {
        return next(new ErrorResponse('Warehouse name already exists', null, 400));
      }
      const newWarehouse = await Warehouse.create({
        name_warehouse: name,
        description_warehouse: description,
        country_warehouse: country,
        postcode_warehouse: postcode,
        street_warehouse: street,
        number_warehouse: number,
        state_warehouse: state,
        city_warehouse: city,
        capacity_warehouse: capacity,
        status_warehouse: status,
      });
      return successHandler(req, res, 'Warehouse created successfully', newWarehouse, 201);
    } catch (err) {
      return next(err);
    }
  },
];
