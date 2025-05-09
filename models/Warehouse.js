const { DataTypes, Model } = require('sequelize');
const sequelize = require('@config/database');
const State = require('@models/State');

class Warehouse extends Model {}

Warehouse.init(
  {
    id_warehouse: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name_warehouse: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 200],
      },
    },
    code_warehouse: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 200],
      },
    },
    description_warehouse: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 200],
      },
    },
    country_warehouse: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 200],
      },
    },
    postcode_warehouse: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1, 10],
      },
    },
    street_warehouse: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 200],
      },
    },
    number_warehouse: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1, 200],
      },
    },
    state_warehouse: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 200],
      },
    },
    city_warehouse: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 200],
      },
    },
    capacity_warehouse: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1, 200],
      },
    },
    status_warehouse: {
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
    modelName: 'Warehouse',
    tableName: 'Warehouses',
    timestamps: true,
    underscored: true,
  }
);

module.exports = Warehouse;
