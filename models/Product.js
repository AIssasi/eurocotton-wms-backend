const { DataTypes, Model } = require('sequelize');

class Product extends Model {}

module.exports = (sequelize) => {
  Product.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 50] // Validación: longitud mínima y máxima del código del producto
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255] // Validación: longitud mínima y máxima de la descripción del producto
      }
    }
  }, {
    sequelize, // Instancia de Sequelize
    modelName: 'Product', // Nombre del modelo
    tableName: 'products', // Nombre de la tabla
    timestamps: true, // Activa createdAt y updatedAt
    underscored: true // Utiliza nombres de columnas en formato snake_case
  });

  return Product;
};
