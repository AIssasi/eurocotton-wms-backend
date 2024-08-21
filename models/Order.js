const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const Warehouse = require('./Warehouse');

class Order extends Model {}

Order.init({
    id_order:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    source_order:{
        type:DataTypes.INTEGER,
        allowNull: false,
        validate:{
            len:[1, 10]
        },
        references:{
            model: Warehouse,
            key: 'id_warehouse'
          }
       
    },
    destination_order:{
        type:DataTypes.INTEGER,
        allowNull: false,
        validate:{
            len:[1, 10]
        }
    },
    type_order:{
        type:DataTypes.INTEGER,
        allowNull: false,
        validate:{
            len:[1, 10]
        }
    },
    provider_order:{
        type:DataTypes.INTEGER,
        allowNull: false,
        validate:{
            len:[1, 10]
        }
    },
},{
    sequelize,
    modelName:'Order',
    tableName:'Orders',
    timestamps:true,
    underscored:true
})

module.exports = Order;