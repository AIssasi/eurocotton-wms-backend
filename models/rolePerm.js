// models/Product.js

import { DataTypes, Model } from 'sequelize';
import sequelize from '#config/database';

// Define el modelo Product
class RolePerm extends Model {}

RolePerm.init(
  {
    id_roleperm: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    role_roleperm: {
      // Cambiado a snake_case
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'Roles', // Asegúrate de que este sea el nombre de tu modelo de Roles en singular
        key: 'id_role',
      },
    },
    permission_roleperm: {
      // Cambiado a snake_case
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'Permissions', // Asegúrate de que este sea el nombre de tu modelo de Permissions en singular
        key: 'id_permission',
      },
    },
  },
  {
    sequelize, // Instancia de Sequelize
    modelName: 'RolePerm', // Nombre del modelo en formato PascalCase
    tableName: 'RolePerms', // Nombre de la tabla en plural y en snake_case
    timestamps: true, // Activa createdAt y updatedAt
    underscored: true, // Utiliza nombres de columnas en formato snake_case
  }
);

export default RolePerm;
