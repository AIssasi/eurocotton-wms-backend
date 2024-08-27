const { State } = require('../models');
const ErrorResponse = require('../utils/errorResponse');
const successHandler = require('../middleware/successHandler/successHandler.middleware');
const { Op } = require('sequelize');
const { body, validationResult } = require('express-validator');


exports.createStatus = [
    // Validación y sanitización
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),

  
    async (req, res, next) => {
      // Validación de los datos
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new ErrorResponse('Validation fields', errors.array(), 400));
      }
  
      try {
        const { name : name_status, description: description_status } = req.body;
        const exisitsStatus = await State.findOne({
            where: { [Op.or]: [{name_status}, {description_status}] }
        });
        if (exisitsStatus) {
            return next(new ErrorResponse('Status already exists', exisitsStatus.id_status, 400));
        }
        const newStatus = await State.create({ name_status, description_status });
        return successHandler(req, res, newStatus.id_status, 'Status created successfully');

    } catch (err) {
         return next(err);
    }
    
    }
  ];


