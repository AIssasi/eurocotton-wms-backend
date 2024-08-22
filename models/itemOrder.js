const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const Order = require('./Order');
const Product = require('./Product');

class ItemOrder extends Model {}

ItemOrder.init({
    id_itemorder:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    order_itemorder:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            len:[1,10]
        },
        references:{
            model: Order,
            key: 'id_order'
          }
    },
    product_itemorder:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            len:[1,10]
        },
        references:{
            model: Product,
            key: 'id_product'
          }
    },
    quantity_itemorder:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            len:[1,10]
        }
    },
},{
    sequelize,
    modelName: 'ItemOrder',
    tableName:'ItemOrders',
    timestamps: true,
    underscored: true
});

module.exports = ItemOrder;