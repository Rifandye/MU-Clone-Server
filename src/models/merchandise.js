'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Merchandise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Merchandise.belongsToMany(models.Category, {
        through: models.Merchandise_Categories,
        foreignKey: 'merchandiseId',
        otherKey: 'categoryId',
      });

      Merchandise.hasMany(models.Image, {
        foreignKey: 'MerchandiseId',
      });

      Merchandise.belongsTo(models.User, {
        foreignKey: 'createdBy',
        as: 'createdByUser',
      });

      Merchandise.belongsTo(models.User, {
        foreignKey: 'updatedBy',
        as: 'updatedByUser',
      });
    }
  }
  Merchandise.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      slug: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      stock: DataTypes.INTEGER,
      createdBy: DataTypes.UUID,
      updatedBy: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: 'Merchandise',
      timestamps: true,
      paranoid: true,
    },
  );
  return Merchandise;
};
