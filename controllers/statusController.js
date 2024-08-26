const {
    State
} = require('../models');
const ErrorResponse = require('../utils/errorResponse');
const successHandler = require('../middleware/successHandler/successHandler.middleware');
const {
    Op
} = require('sequelize');

exports.createStatus = async (req, res, next) => {
    try {
        const {
            name,
            description
        } = req.body;
        const exisitsStatus = await State.findOne({
            where: {
                [Op.or]: [{
                    name_status: name
                }, {
                    description_status: description
                }]
            }
        });
        if (exisitsStatus) {
            return next(new ErrorResponse('Status already exists', 400));
        }
        const newStatus = await State.create({
            name_status: name,
            description_status: description
        });
        successHandler(req, res, newStatus, 'Status created successfully');

    } catch (err) {
        next(err);
    }
}

exports.updateStatus = async (req, res, next) => {
    let statusId = req.params.id;
    statusId = parseInt(statusId);

    const {
        name,
        description
    } = req.body;

    if (statusId) {
        try {
            const status = await State.findByPk(statusId);

            if (!status) {
                return next(new ErrorResponse('Status not found', 404))
            }

            status.name_status = name;
            status.description_status = description;

            await status.save();
            successHandler(req, res, status, 'Status updated successfully');
        } catch (err) {
            next(err);
        }
    } else {
        return next(new ErrorResponse('statusId are required fields', 401));
    }
}