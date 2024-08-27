const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Composition extends Model {}

Composition.init(
  {
    id_composition: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name_composition: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 200],
      },
    },
    description_composition: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 200],
      },
    },
  },
  {
    sequelize,
    modelName: 'Composition',
    tableName: 'Compositions',
    timestamps: true,
    underscored: true,
  }
);

module.exports = Composition;
