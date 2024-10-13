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
      Merchandise.hasMany(models.Image, {
        foreignKey: 'merchandise_ise',
        as: 'images',
      });

      Merchandise.belongsToMany(models.Category, {
        through: 'merchandise_categories',
        foreignKey: 'merchandise_id',
        as: 'categories',
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
      price: DataTypes.DECIMAL,
      stock: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Merchandise',
      tableName: 'merchandises',
    },
  );
  return Merchandise;
};
