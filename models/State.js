const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database')

class State extends Model {}

State.init({
    id_status:{
       type: DataTypes.INTEGER,
       autoIncrement: true,
       primaryKey: true,
       allowNull: false,
    },
    name_status:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            len:[1, 200]
        }
    },
    description_status:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            len:[1, 200]
        }
    },
},{
    sequelize,
    modelName:'State',
    tableName:'Status',
    timestamps: true,
    underscored: true
});

module.exports = State;