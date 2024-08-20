const sequelize = require('../config/database'); // Importar la instancia de Sequelize

const User = require('./User');
const Role = require('./Role');
const Permission = require('./Permission');
const RolePerm = require('./rolePerm');


const initModels = () => {
    // Definir relaciones
    User.belongsTo(Role, { foreignKey: 'role_user', as: 'role' });
    Role.hasMany(User, { foreignKey: 'role_user' });
  
    Role.belongsToMany(Permission, {
      through: RolePerm,
      foreignKey: 'role_roleperm',
      otherKey: 'permission_roleperm',
      as: 'permissions'
    });
    
    Permission.belongsToMany(Role, {
      through: RolePerm,
      foreignKey: 'permission_roleperm',
      otherKey: 'role_roleperm',
      as: 'roles'
    });
  };

  // Inicializar modelos y relaciones
    initModels();

  module.exports = {
    sequelize,
    User,
    Role,
    Permission,
    RolePerm
  };