'use strict';
const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        let data = JSON.parse(fs.readFileSync('./data/books.json', 'utf-8'));
        data.forEach((el) => {
            el.createdAt = new Date();
            el.updatedAt = new Date();
        })
        await queryInterface.bulkInsert('Books', data);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('Books', null);
    },
};
