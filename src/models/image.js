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
      Image.belongsTo(models.Merchandise);

      Image.belongsTo(models.User, {
        foreignKey: 'createdBy',
      });

      Image.belongsTo(models.User, {
        foreignKey: 'updatedBy',
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
      url: DataTypes.TEXT,
      MerchandiseId: DataTypes.UUID,
      createdBy: DataTypes.UUID,
      updatedBy: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: 'Image',
      timestamps: true,
      paranoid: true,
    },
  );
  return Image;
};
