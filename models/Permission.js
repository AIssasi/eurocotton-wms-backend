const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Permission extends Model {}

Permission.init(
  {
    id_permission: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name_permission: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 50], // Validación: longitud mínima y máxima del nombre
      },
    },
    description_permission: {
      type: DataTypes.TEXT,
      allowNull: true, // Permite nulos si no se proporciona una descripción
    },
  },
  {
    sequelize, // Instancia de Sequelize
    modelName: 'Permission', // Nombre del modelo
    tableName: 'permissions', // Nombre de la tabla
    timestamps: true, // Activa createdAt y updatedAt
    underscored: true, // Utiliza nombres de columnas en formato snake_case
  }
);
module.exports = Permission;
