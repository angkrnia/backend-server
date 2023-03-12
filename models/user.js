'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const { hashPassword } = require('../helpers/bcrypt');
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Content)
    }
  };
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (instance, option) => {
        instance.password = hashPassword(instance.password)
      },
      beforeBulkCreate: (instances, option) => {
        instances.forEach(element => {
          element.password = hashPassword(element.password)
        });
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};