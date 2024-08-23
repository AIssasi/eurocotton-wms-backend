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
      
      return next(new ErrorResponse('Role not found', 404));
    }

    // Actualizar los campos del rol
    role.name = name;
    role.description = description;

    // Guardar los cambios en la base de datos
    await role.save();

    // Responder con éxito
    successHandler(req, res, role, 'Role updated successfully');
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


exports.getAllRoles = async (req, res, next) => {
  try{
    const roles = await Role.findAll({ attributes:['id_role', 'name_role','description_role'] });
    if(!roles.length){
      return next(new ErrorResponse('Roles not found', 404));
    }
    successHandler(req, res, roles, 'Roles retrieved successfully');
  }catch(err){
    next(err);
  }
}

exports.getRoleById = async (req, res, next ) => {
  let  roleId  = req.params.id;
  roleId = parseInt(roleId)
  if(roleId){
  
    try{
      const role = await Role.findByPk(roleId, { attributes: ['id_role', 'name_role', 'description_role'] });
      if(!role){
        return next(new ErrorResponse('Role not found', 404));
      }
      successHandler(req, res, role, 'Role retrieved successfully');
    }catch(err){
      next(err);
    }

  }else{
    return next(new ErrorResponse('roleId are required fields', 401));
  }
}


