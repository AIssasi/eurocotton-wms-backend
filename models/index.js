import sequelize from '#config/database';
import User from '#models/User';
import Role from '#models/Role';
import Permission from '#models/Permission';
import RolePerm from '#models/rolePerm';
import Product from '#models/Product';
import Brand from '#models/Brand';
import Category from '#models/Category';
import Composition from '#models/Composition';
import Color from '#models/Color';
import State from '#models/State';
import Warehouse from '#models/Warehouse';
import Provider from '#models/Provider';
import Order from '#models/Order';
import orderType from '#models/orderType';
import Movement from '#models/Movement';
import Inventory from '#models/Inventory';
import itemOrder from '#models/itemOrder';
import Image from '#models/Image';
import QuickEntry from '#models/Quickentry';
import PackingFactor from '#models/Packingfactor';

const initModels = () => {
  // Definir relaciones
  User.belongsTo(Role, { foreignKey: 'role_user', as: 'role' });
  Role.hasMany(User, { foreignKey: 'role_user' });

  Product.belongsTo(Brand, { foreignKey: 'brand_product', as: 'brand' });
  Brand.hasMany(Product, { foreignKey: 'brand_product' });

  Product.belongsTo(Category, { foreignKey: 'category_product', as: 'category' });
  Category.hasMany(Product, { foreignKey: 'category_product' });

  Product.belongsTo(Composition, { foreignKey: 'composition_product', as: 'composition' });
  Composition.hasMany(Product, { foreignKey: 'composition_product' });

  Product.belongsTo(Color, { foreignKey: 'color_product', as: 'color' });
  Color.hasMany(Product, { foreignKey: 'color_product' });

  Brand.belongsTo(State, { foreignKey: 'status_brand', as: 'state' });
  State.hasMany(Brand, { foreignKey: 'status_brand' });

  Category.belongsTo(State, { foreignKey: 'status_category', as: 'state' });
  State.hasMany(Category, { foreignKey: 'status_category' });

  Warehouse.belongsTo(State, { foreignKey: 'status_warehouse', as: 'state' });
  State.hasMany(Warehouse, { foreignKey: 'status_warehouse' });

  Provider.belongsTo(State, { foreignKey: 'status_provider', as: 'state' });
  State.hasMany(Provider, { foreignKey: 'status_provider' });

  Order.belongsTo(Warehouse, { foreignKey: 'source_order', as: 'warehouse' });
  Warehouse.hasMany(Order, { foreignKey: 'source_order' });

  Order.belongsTo(orderType, { foreignKey: 'type_order', as: 'ordertype' });
  orderType.hasMany(Order, { foreignKey: 'type_order' });

  Order.belongsTo(Warehouse, { foreignKey: 'destination_order', as: 'Warehouse' });
  Warehouse.hasMany(Order, { foreignKey: 'destination_order' });

  Movement.belongsTo(Product, { foreignKey: 'product_movement', as: 'product' });
  Product.hasMany(Movement, { foreignKey: 'product_movement' });

  Movement.belongsTo(Warehouse, { foreignKey: 'source_movement', as: 'warehouse' });
  Warehouse.hasMany(Movement, { foreignKey: 'source_movement' });

  Movement.belongsTo(Warehouse, { foreignKey: 'destination_movement', as: 'Warehouse' });
  Warehouse.hasMany(Movement, { foreignKey: 'destination_movement' });

  Inventory.belongsTo(Product, { foreignKey: 'product_inventory', as: 'product' });
  Product.hasMany(Inventory, { foreignKey: 'product_inventory' });

  Inventory.belongsTo(Warehouse, { foreignKey: 'warehouse_inventory', as: 'warehouse' });
  Warehouse.hasMany(Inventory, { foreignKey: 'warehouse_inventory' });

  itemOrder.belongsTo(Order, { foreignKey: 'order_itemorder', as: 'order' });
  Order.hasMany(itemOrder, { foreignKey: 'order_itemorder' });

  itemOrder.belongsTo(Product, { foreignKey: 'product_itemorder', as: 'product' });
  Product.hasMany(itemOrder, { foreignKey: 'product_itemorder' });

  Image.belongsTo(Product, { foreignKey: 'product_image', as: 'Product' });
  Product.hasMany(Image, { foreignKey: 'product_image' });

  PackingFactor.hasMany(QuickEntry, { foreignKey: 'sku_quick', as: 'quickentry' });

  QuickEntry.belongsTo(PackingFactor, { foreignKey: 'sku_quick', as: 'quickentry' });

  Role.belongsToMany(Permission, {
    through: RolePerm,
    foreignKey: 'role_roleperm',
    otherKey: 'permission_roleperm',
    as: 'permissions',
  });

  Permission.belongsToMany(Role, {
    through: RolePerm,
    foreignKey: 'permission_roleperm',
    otherKey: 'role_roleperm',
    as: 'roles',
  });
};

// Inicializar modelos y relaciones
initModels();

export {
  sequelize,
  User,
  Role,
  Permission,
  RolePerm,
  Product,
  Brand,
  Category,
  Composition,
  Color,
  State,
  Warehouse,
  Provider,
  Order,
  Movement,
  Inventory,
  itemOrder,
  Image,
  QuickEntry,
  PackingFactor,
};
