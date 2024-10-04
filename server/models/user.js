'use strict';

const { Model } = require('sequelize');
const { hashPassword } = require('../Helpers/bycripts');

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

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    hooks: {
      beforeCreate(user, options) {
        // Ensure the password is hashed before saving
        user.password = hashPassword(user.password);
      },
    },
    sequelize,
    modelName: 'User',
  });

  return User;
};