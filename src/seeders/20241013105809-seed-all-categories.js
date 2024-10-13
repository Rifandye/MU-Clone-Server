'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const categoryData = require('../data/category.json').map((data) => {
      data.id = uuidv4();
      data.createdAt = new Date();
      data.updatedAt = new Date();
      return data;
    });

    await queryInterface.bulkInsert('Categories', categoryData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {
      truncate: true,
      cascade: true,
    });
  },
};
