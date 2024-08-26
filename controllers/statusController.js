const { State } = require('../models');
const ErrorResponse = require('../utils/errorResponse');
const successHandler = require('../middleware/successHandler/successHandler.middleware');
const { Op } = require('sequelize');

exports.createStatus = async (req, res, next) => {
    const { name, description } = req.body;
    if(name.length && description.length){
        try {
        
            const exisitsStatus = await State.findOne({
                where: { [Op.or]: [{name_status: name}, {description_status: description}] }
            });
            if (exisitsStatus) {
                return next(new ErrorResponse('Status already exists', 400));
            }
            const newStatus = await State.create({ name_status: name, description_status: description });
            successHandler(req, res, newStatus, 'Status created successfully');

        } catch (err) {
            next(err);
        }
    }else{
        return next(new ErrorResponse('all fields are required',400));
    }

    return next;
}

