 const { DataTypes, Model} = require('sequelize');
 const sequelize = require('../config/database');

 class Color extends Model {}

 Color.init({
     id_color:{
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
         allowNull: false
     },
     name_color:{
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
             len:[1, 200]
         }
     },
     description_color:{
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
             len:[1, 200]
         }
     },
     code_color:{
         type: DataTypes.STRING,
         allowNull: false,
         validate:{
             len:[1, 200]
         }
     }
 },{
     sequelize,
     modelName: 'Color',
     tableName: 'Colors',
     timestamps: true,
     underscored: true
 });

 module.exports = Color

