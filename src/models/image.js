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
    }
  }
  Image.init(
    {
      url: DataTypes.TEXT,
      merchandiseId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: 'Image',
      timestamps: true,
    },
  );
  return Image;
};
