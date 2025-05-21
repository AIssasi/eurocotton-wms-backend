import { DataTypes, Model } from 'sequelize';
import sequelize from '#config/database';
import Brand from '#models/Brand';
import Category from '#models/Category';
import Composition from '#models/Composition';
import Color from '#models/Color';
import State from '#models/State';

class Product extends Model {}

Product.init(
  {
    id_product: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name_product: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 200],
      },
    },
    description_product: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 200], // Validación: longitud mínima y máxima de la descripción del producto
      },
    },
    sku_product: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 200], // Validación: longitud mínima y máxima del código del producto
      },
    },
    brand_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Brand,
        key: 'id_brand',
      },
    },
    category_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: 'id_category',
      },
    },
    composition_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Composition,
        key: 'id_composition',
      },
    },
    color_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Color,
        key: 'id_color',
      },
    },
    weight_product: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    status_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: State,
        key: 'id_status',
      },
    },
  },
  {
    sequelize, // Instancia de Sequelize
    modelName: 'Product', // Nombre del modelo
    tableName: 'products', // Nombre de la tabla
    timestamps: true, // Activa createdAt y updatedAt
    underscored: true, // Utiliza nombres de columnas en formato snake_case
  }
);

export default Product;
