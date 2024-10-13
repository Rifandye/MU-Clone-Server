'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Merchandise_Categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Merchandise_Categories.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      merchandiseId: DataTypes.UUID,
      categoryId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: 'Merchandise_Categories',
    },
  );
  return Merchandise_Categories;
};
