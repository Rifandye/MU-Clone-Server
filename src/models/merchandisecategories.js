'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MerchandiseCategories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MerchandiseCategories.belongsTo(models.Merchandise, {
        foreignKey: 'merchandise_id',
        as: 'merchandise',
      });

      MerchandiseCategories.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'category',
      });
    }
  }
  MerchandiseCategories.init(
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
      category_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'MerchandiseCategories',
      tableName: 'merchandise_categories',
    },
  );
  return MerchandiseCategories;
};
