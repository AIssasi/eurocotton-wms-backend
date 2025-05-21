import { DataTypes, Model } from 'sequelize';
import sequelize from '#config/database';

class PackingFactor extends Model {}

PackingFactor.init(
  {
    id_factor_empaque: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    factor_empaque: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    factor_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'PackingFactor',
    tableName: 'PackingFactors',
    timestamps: true,
    underscored: true,
    paranoid: true,
  }
);

export default PackingFactor;
