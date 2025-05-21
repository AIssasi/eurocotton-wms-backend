import Role from '#models/Role';
import successHandler from '#middleware/success/successHandler.middleware';
import ErrorResponse from '#utils/errorResponse';
import { body, param, validationResult } from 'express-validator';

export function createRole() {
  return [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),

    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new ErrorResponse('Validation fields', errors.array(), 400));
      }

      try {
        const { name: name_role, description: description_role } = req.body;

        const existingRole = await Role.findOne({ where: { name_role } });
        if (existingRole) {
          return next(new ErrorResponse('The role already exists', existingRole, 400));
        }

        const role = await Role.create({ name_role, description_role });

        return successHandler(req, res, 'Role created successfully', role, 201);
      } catch (error) {
        return next(error);
      }
    },
  ];
}

export function updateRole() {
  return [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
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
        const { name, description } = req.body;
        const role = await Role.findByPk(id);

        if (!role) {
          return next(new ErrorResponse('Role not found', null, 404));
        }

        role.name_role = name;
        role.description_role = description;

        await role.save();
        return successHandler(req, res, 'Role updated successfully', role, 200);
      } catch (error) {
        return next(error);
      }
    },
  ];
}

export function deleteRole() {
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
        const role = await Role.findByPk(id);

        if (!role) {
          return next(new ErrorResponse('Role not found', null, 404));
        }

        await role.destroy();
        return successHandler(req, res, 'Role deleted successfully', role.id_role, 200);
      } catch (error) {
        return next(error);
      }
    },
  ];
}

export function getAllRoles() {
  return [
    async (req, res, next) => {
      try {
        const roles = await Role.findAll({
          attributes: ['id_role', 'name_role', 'description_role'],
        });
        if (!roles.length) {
          return next(new ErrorResponse('Roles not found', null, 404));
        }
        return successHandler(req, res, 'Roles retrieved successfully', roles, 200);
      } catch (err) {
        return next(err);
      }
    },
  ];
}

export function getRoleById() {
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
        const role = await Role.findByPk(id, {
          attributes: ['id_role', 'name_role', 'description_role'],
        });

        if (!role) {
          return next(new ErrorResponse('Role not found', null, 404));
        }
        return successHandler(req, res, 'Role retrieved successfully', role, 200);
      } catch (err) {
        return next(err);
      }
    },
  ];
}
