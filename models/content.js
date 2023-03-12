'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Content extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Content.belongsTo(models.User)
    }
  };
  Content.init({
    UserId: DataTypes.INTEGER,
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Name must be filled'},
        notEmpty: { msg: 'Name must be filled' },
      }
    },
    image: DataTypes.STRING,
    description1: DataTypes.TEXT,
    description2: DataTypes.TEXT,
    description3: DataTypes.TEXT,
    description4: DataTypes.TEXT,
    description5: DataTypes.TEXT,
    description6: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Content',
  });
  return Content;
};