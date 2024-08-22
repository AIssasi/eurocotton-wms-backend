const { DataTypes, Model  } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product');

class Movement extends Model {}

Movement.init({
    id_movement:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    product_movement:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            len:[1, 10]
        },
        references:{
            model: Product,
            key: 'id_product'
          }
    },
    quantity_movement:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            len:[1, 10]
        },
    },
    source_movement:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            len:[1, 10]
        },
    },
    destination_movement:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            len:[1, 10]
        },
    },

},{
    sequelize,
    modelName:'Movement',
    tableName:'Movements',
    timestamps: true,
    underscored: true
});

module.exports = Movement;