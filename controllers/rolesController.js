// controllers/rolesController.js

const Role = require('../models/Role');
const successHandler = require('../middleware/successHandler/successHandler.middleware');
const ErrorResponse = require('../utils/errorResponse');
exports.createRole = async (req, res, next) => {
  const { name : name_role, description : description_role } = req.body;

  try {
    // Verificar si el rol ya existe
    const existingRole = await Role.findOne({ where: { name_role } });
    if (existingRole) {
      return next(new ErrorResponse('The role already exists', 400));
    }

    // Crear el nuevo rol
    const role = await Role.create({ name_role, description_role });

    // Devolver el resultado de la inserción
    successHandler(req, res, role, 'Role created successfully');
  } catch (error) {
    next(error);
  }
};


exports.updateRole = async (req, res, next) => {
  const roleId = req.params.id;
  const { name, description } = req.body;

  try {
    // Buscar el rol por su ID
    const role = await Role.findByPk(roleId);

    // Verificar si el rol existe
    if (!role) {
      return res.status(404).json({ success: false, message: 'Role not found' });
    }

    // Actualizar los campos del rol
    role.name = name;
    role.description = description;

    // Guardar los cambios en la base de datos
    await role.save();

    // Responder con éxito
    res.status(200).json({ success: true, message: 'Role updated successfully', data: role });
  } catch (error) {
    // Manejar errores
    next(error);
  }
};

exports.deleteRole = async (req, res, next) => {
    const roleId = req.params.id;
  
    try {
      // Buscar el rol por su ID
      const role = await Role.findByPk(roleId);
  
      // Verificar si el rol existe
      if (!role) {
        return res.status(404).json({ success: false, message: 'Role not found' });
      }
  
      // Eliminar el rol de la base de datos
      await role.destroy();
  
      // Responder con éxito
      res.status(200).json({ success: true, message: 'Role deleted successfully' });
    } catch (error) {
      // Manejar errores
      next(error);
    }
  };



