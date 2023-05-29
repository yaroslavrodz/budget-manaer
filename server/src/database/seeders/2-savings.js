'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'savings',
      [
        {
          name: 'Cash',
          amount: 4000,
          type: 'Cash',
          userId: 1,
        },
        {
          name: 'Bank 1',
          amount: 4500,
          type: 'Digital',
          userId: 1,
        },
        {
          name: 'Bank 2',
          amount: 12000,
          type: 'Digital',
          userId: 1,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('savings', null, {});
  },
};
