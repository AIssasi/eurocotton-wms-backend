// controllers/rolesController.js

const Role = require('../models/Role');

exports.createRole = async (req, res, next) => {
  const { name, description } = req.body;

  try {
    // Verificar si el rol ya existe
    const existingRole = await Role.findOne({ where: { name } });
    if (existingRole) {
      return res.status(400).json({ success: false, message: 'El rol ya existe' });
    }

    // Crear el nuevo rol
    const role = await Role.create({ name, description });

    // Devolver el resultado de la inserción
    res.status(201).json({ success: true, message: 'Rol creado exitosamente', data: role });
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



