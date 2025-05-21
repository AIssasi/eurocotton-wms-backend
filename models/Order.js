import { DataTypes, Model } from 'sequelize';
import sequelize from '#config/database';
import Warehouse from '#models/Warehouse';
import OrderType from '#models/orderType';

class Order extends Model {}

Order.init(
  {
    id_order: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    source_order: {
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
    destination_order: {
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
    type_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1, 10],
      },
      references: {
        model: OrderType,
        key: 'id_ordertype',
      },
    },
    provider_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1, 10],
      },
    },
  },
  {
    sequelize,
    modelName: 'Order',
    tableName: 'Orders',
    timestamps: true,
    underscored: true,
  }
);

export default Order;
