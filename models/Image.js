const {DataTypes, Model} = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product');

class Image extends Model{}

//Definición del modelo
Image.init({
    id_image:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate:{
            len:[1,10]
        },
    },
    product_image:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: true,
        validate:{
            len:[1,10]
        },
        references:{
            model: Product,
            key: 'id_product'
          }
    },
    url_image:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            len:[1,500]
        }
    },
    data_image:{
        type:DataTypes.BLOB,
    },
    description_image:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            len:[1,200]
        }
    },
    alttext_image:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            len:[1,200]
        }
    }
},
{
    sequelize,
    modelName: 'Image',
    tableName: 'Images',
    timestamps: true,
    underscored: true
});

module.exports = Image