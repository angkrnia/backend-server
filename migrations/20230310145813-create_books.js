'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable('Books', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            author: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            publisher: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            year: {
                type: Sequelize.INTEGER,
            },
            isbn: {
                type: Sequelize.STRING,
            },
            language: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            page: {
                type: Sequelize.STRING,
            },
            length: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            weight: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            width: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            cover: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.TEXT,
            },
            category: {
                type: Sequelize.STRING,
            },
            rating: {
                type: Sequelize.STRING,
            },
            is_borrowed: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
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
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.dropTable('Books');
    },
};
