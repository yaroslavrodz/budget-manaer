'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'categories',
      [
        { name: 'Work', userId: 1 },
        { name: 'Food', userId: 1 },
        { name: 'Appartaments', userId: 1 },
        { name: 'Transport', userId: 1 },
        { name: 'Clothes', userId: 1 },
        { name: 'Health', userId: 1 },
        { name: 'Entertaiment', userId: 1 },
        { name: 'Education', userId: 1 },
        { name: 'Gifts', userId: 1 },
        { name: 'Other', userId: 1 },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});
  },
};
