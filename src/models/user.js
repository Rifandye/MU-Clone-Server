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
      // define association here
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
    },
  );

  User.beforeCreate((user) => {
    user.password = hashPass(user.password);
  });

  return User;
};
