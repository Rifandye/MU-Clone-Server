'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.belongsToMany(models.Merchandise, {
        through: models.Merchandise_Categories,
        foreignKey: 'categoryId',
        otherKey: 'merchandiseId',
      });
    }
  }
  Category.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Category',
      timestamps: true,
    },
  );
  return Category;
};
