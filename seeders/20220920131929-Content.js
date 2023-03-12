'use strict';
const fs = require('fs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = JSON.parse(fs.readFileSync('./data/content.json', 'utf-8'))
    data.forEach(element => {
      element.createdAt = new Date()
      element.updatedAt = new Date()
    });
    await queryInterface.bulkInsert('Contents', data)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Contents', null);
  }
};
