'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image.belongsTo(models.Merchadise, {
        foreignKey: 'merchandise_id',
        as: 'merchandise',
      });
    }
  }
  Image.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      merchandise_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'merchandises',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Image',
      tableName: 'images',
    },
  );
  return Image;
};
