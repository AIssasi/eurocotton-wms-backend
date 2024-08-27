const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Role extends Model {}

Role.init(
  {
    id_role: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name_role: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 50], // Validación: longitud mínima y máxima del nombre
      },
    },
    description_role: {
      type: DataTypes.TEXT,
      allowNull: true, // Permite nulos si no se proporciona una descripción
    },
  },
  {
    sequelize, // Instancia de Sequelize
    modelName: 'Role', // Nombre del modelo
    tableName: 'roles', // Nombre de la tabla
    timestamps: true, // Activa createdAt y updatedAt
    underscored: true, // Utiliza nombres de columnas en formato snake_case
  }
);

module.exports = Role;
