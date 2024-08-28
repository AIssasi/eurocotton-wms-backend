const { DataTypes, Model } = require('sequelize');
const sequelize = require('@config/database');

class OrderType extends Model {}

OrderType.init(
  {
    id_ordertype: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name_ordertype: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 200],
      },
    },
    description_ordertype: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 200],
      },
    },
  },
  {
    sequelize,
    modelName: 'OrderType',
    tableName: 'OrderTypes',
    timestamps: true,
    underscored: true,
  }
);

module.exports = OrderType;
