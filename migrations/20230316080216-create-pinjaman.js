'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pinjamans', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.STRING,
        },
        BookId: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
                model: 'Books',
                key: 'id',
            },
        },
        UserId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            },
        },
        telepon: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        alamat: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lama_pinjam: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        tanggal_pinjam: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        tanggal_kembali: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        denda: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Pinjamans');
  }
};