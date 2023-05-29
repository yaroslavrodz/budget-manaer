'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashPassword = await bcrypt.hash('1111', 7);

    await queryInterface.bulkInsert(
      'users',
      [
        {
          username: 'Arnold',
          email: 'arnold@mail.com',
          password: hashPassword,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
