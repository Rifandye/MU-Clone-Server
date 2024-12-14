'use strict';
const { Model } = require('sequelize');
const { Sequelize } = require('.');
const { hashPass } = require('../utils/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Merchandise, {
        foreignKey: 'createdBy',
      });

      User.hasMany(models.Merchandise, {
        foreignKey: 'updatedBy',
      });

      User.hasMany(models.Category, {
        foreignKey: 'createdBy',
      });

      User.hasMany(models.Category, {
        foreignKey: 'updatedBy',
      });

      User.hasMany(models.Image, {
        foreignKey: 'createdBy',
      });

      User.hasMany(models.Image, {
        foreignKey: 'updatedBy',
      });
    }
  }
  User.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM('FANS', 'ADMIN'),
        defaultValue: 'FANS',
      },
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: true,
      paranoid: true,
    },
  );

  User.beforeCreate((user) => {
    user.password = hashPass(user.password);
  });

  return User;
};
