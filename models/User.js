// models/User.js

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database')
const Role = require('./Role')

class User extends Model {}

  // Definición del modelo
  User.init({
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username_user: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 50] // Validación: longitud mínima y máxima del nombre de usuario
      }
    },
    email_user: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true // Validación: debe ser una dirección de correo electrónico válida
      }
    },
    password_user: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 100] // Validación: longitud mínima y máxima de la contraseña
      }
    },
    role_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Role,
        key: 'id_role'
      },
      onDelete: 'SET NULL' // Manejo de eliminación: poner en NULL el role_id si el rol es eliminado
    },
    isactive_user: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  }, {
    sequelize, // Instancia de Sequelize
    modelName: 'User', // Nombre del modelo
    tableName: 'users', // Nombre de la tabla (opcional, por defecto es el nombre del modelo en plural)
    timestamps: true, // Habilita createdAt y updatedAt
    underscored: true, // Utiliza nombres de columnas en formato snake_case
    paranoid: true // Habilita soft deletes (opcional)
  });

module.exports = User;
