'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const merchandiseData = require('../data/merchandise.json').map((data) => {
      data.id = uuidv4();
      data.createdAt = new Date();
      data.updatedAt = new Date();
      return data;
    });

    await queryInterface.bulkInsert('merchandises', merchandiseData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('merchandises', null, {
      truncate: true,
      cascade: true,
    });
  },
};
