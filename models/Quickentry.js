import { DataTypes, Model } from 'sequelize';
import sequelize from '#config/database';
import PackingFactor from '#models/Packingfactor';

class QuickEntry extends Model {}

QuickEntry.init(
  {
    id_quick: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    sku_quick: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: PackingFactor,
        key: 'id_factor_empaque',
      },
    },
    colour_quick: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    size_quick: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    pallet_number_quick: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        isNumeric: true,
      },
    },
  },
  {
    sequelize,
    modelName: 'QuickEntry',
    tableName: 'quickEntrys',
    timestamps: true,
    underscored: true,
    paranoid: true,
  }
);

export default QuickEntry;
