'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pinjaman extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pinjaman.belongsTo(models.Books);
      Pinjaman.belongsTo(models.User);
    }
  }
  Pinjaman.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    BookId: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    telepon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lama_pinjam: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanggal_pinjam: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tanggal_kembali: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Dipinjam',
    },
    denda: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
  }, {
    sequelize,
    modelName: 'Pinjaman',
  });
  return Pinjaman;
};