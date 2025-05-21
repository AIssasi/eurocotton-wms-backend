import { DataTypes, Model } from 'sequelize';
import sequelize from '#config/database';
import State from '#models/State';

class Brand extends Model {}

Brand.init(
  {
    id_brand: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name_brand: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 200],
      },
    },
    description_brand: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 200],
      },
    },
    status_brand: {
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
    modelName: 'Brand',
    tableName: 'Brands',
    timestamps: true,
    underscored: true,
  }
);

export default Brand;
