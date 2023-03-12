'use strict';
const fs = require('fs');
const { User } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = JSON.parse(fs.readFileSync('./data/user.json', 'utf-8'))
    data.forEach(element => {
      element.createdAt = new Date()
      element.updatedAt = new Date()
    });
    await User.bulkCreate(data)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null);
  }
};
