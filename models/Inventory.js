import { DataTypes, Model } from 'sequelize';
import sequelize from '#config/database';
import Product from '#models/Product';
import Warehouse from '#models/Warehouse';

class Inventory extends Model {}

Inventory.init(
  {
    id_inventory: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    product_inventory: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1, 10],
      },
      references: {
        model: Product,
        key: 'id_product',
      },
    },
    quantity_inventory: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1, 10],
      },
    },
    warehouse_inventory: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1, 10],
      },
      references: {
        model: Warehouse,
        key: 'id_warehouse',
      },
    },
  },
  {
    sequelize,
    modelName: 'Inventory',
    tableName: 'Inventories',
    timestamps: true,
    underscored: true,
  }
);

export default Inventory;
