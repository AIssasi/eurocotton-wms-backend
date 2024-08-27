const { State } = require('../models');
const ErrorResponse = require('../utils/errorResponse');
const successHandler = require('../middleware/successHandler/successHandler.middleware');
const { Op } = require('sequelize');
const { body,param, validationResult } = require('express-validator');


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


  exports.updateStatus = [

    body('name').trim().notEmpty().withMessage('Name is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    param('id').notEmpty().withMessage('Id is required').isInt({min:1}).withMessage('Id must be a positive integer'),

    async(req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return next(new ErrorResponse('Validation fields', errors.array(), 400));
        }
    
    try {
        
    let statusId = req.params.id;
    statusId = parseInt(statusId);
        const { name, description } = req.body;

        const status = await State.findByPk(statusId);

        if (!status) {
            return next(new ErrorResponse('Validation fields', errors.array(), 404))
        }

        status.name_status = name;
        status.description_status = description;

        await status.save();
        return successHandler(req, res,'Status updated successfully', status.id_status, 201 );
    } catch (err) {
       return next(err);
    }

}
  ];

  exports.deleteStatus = [
   param('id').notEmpty().withMessage('Id is required').isInt({min:1}).withMessage('Id must be a positive integer'),

   async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse('Validation fields', errors.array(), 400));
    }

    try {
        const statusId = req.params.id;
        const status = await State.findByPk(statusId);

        if (!status) {
            return next(new ErrorResponse('Validation fields', errors.array(), 401));
        }

        await status.destroy();
        return successHandler(req, res,  'Status deleted successfully', status.id_status, 200);
    } catch (err) {
        return next(err);
    }
}
  ];

