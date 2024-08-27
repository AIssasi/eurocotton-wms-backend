const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const State = require('./State');

class Category extends Model {}

Category.init(
  {
    id_category: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name_category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 200],
      },
    },
    description_category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 200],
      },
    },
    status_category: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: State,
        key: 'id_status',
      },
    },
  },
  {
    sequelize,
    modelName: 'Category',
    tableName: 'Categories',
    timestamps: true,
    underscored: true,
  }
);
module.exports = Category;
