const sequelize = require('../config/database'); // Importar la instancia de Sequelize

const User = require('./User');
const Role = require('./Role');
const Permission = require('./Permission');
const RolePerm = require('./rolePerm');
const Product = require('./Product');
const Brand = require('./Brand');
const Category = require('./Category');
const Composition = require('./Composition')

const initModels = () => {
    // Definir relaciones
    User.belongsTo(Role, { foreignKey: 'role_user', as: 'role' });
    Role.hasMany(User, { foreignKey: 'role_user' });

    Product.belongsTo(Brand, {foreignKey: 'brand_product', as: 'brand' });
    Brand.hasMany(Product, {foreignKey: 'brand_product' });
      
    Product.belongsTo(Category, {foreignKey: 'category_product', as: 'category' });
    Category.hasMany(Product, {foreignKey: 'category_product' });

    Product.belongsTo(Composition, {foreignKey: 'composition_product', as: 'composition' });
    Composition.hasMany(Product, {foreignKey: 'composition_product' });


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
    RolePerm,
    Product,
    Brand,
    Category,
    Composition
   
  };