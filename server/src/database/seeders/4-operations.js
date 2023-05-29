'use strict';

function generateDate(dateFrom, dateTo) {
  const difference = dateTo.getTime() - dateFrom.getTime();
  const randomTime = Math.floor(Math.random() * difference);
  return new Date(dateFrom.getTime() + randomTime);
}

const mock = [
  {
    name: 'Food',
    amount: 500,
    type: 'Spend',
    userId: 1,
    savingId: 1,
    categoryId: 2,
  },
  {
    name: 'Drink',
    amount: 50,
    type: 'Spend',
    userId: 1,
    savingId: 1,
    categoryId: 2,
  },
  {
    name: 'Fruits',
    amount: 150,
    type: 'Spend',
    userId: 1,
    savingId: 1,
    categoryId: 2,
  },
  {
    name: 'Pizza',
    amount: 100,
    type: 'Spend',
    userId: 1,
    savingId: 1,
    categoryId: 2,
  },
  {
    name: 'Appartaments',
    amount: 3000,
    type: 'Spend',
    userId: 1,
    savingId: 3,
    categoryId: 3,
  },
  {
    name: 'Gasoline',
    amount: 500,
    type: 'Spend',
    userId: 1,
    savingId: 1,
    categoryId: 4,
  },
  {
    name: 'Salary',
    amount: 15000,
    type: 'Incoming',
    userId: 1,
    savingId: 3,
    categoryId: 1,
  },
  {
    name: 'Pharmacy',
    amount: 500,
    type: 'Spend',
    userId: 1,
    savingId: 2,
    categoryId: 6,
  },
  {
    name: 'Clothes',
    amount: 400,
    type: 'Spend',
    userId: 1,
    savingId: 1,
    categoryId: 5,
  },
  {
    name: 'Cinema',
    amount: 100,
    type: 'Spend',
    userId: 1,
    savingId: 1,
    categoryId: 7,
  },
  {
    name: 'Theater',
    amount: 150,
    type: 'Spend',
    userId: 1,
    savingId: 1,
    categoryId: 7,
  },
  {
    name: 'Courses',
    amount: 400,
    type: 'Spend',
    userId: 1,
    savingId: 1,
    categoryId: 8,
  },
  {
    name: 'Gift',
    amount: 500,
    type: 'Spend',
    userId: 1,
    savingId: 1,
    categoryId: 9,
  },
  {
    name: 'Disposable razor',
    amount: 100,
    type: 'Spend',
    userId: 1,
    savingId: 2,
    categoryId: 9,
  },
  {
    name: 'Shampoo',
    amount: 300,
    type: 'Spend',
    userId: 1,
    savingId: 2,
    categoryId: 9,
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const operations = [];
    const dateFrom = new Date(2022, 4, 0);
    const dateTo = new Date(2023, 4, 0);

    [...new Array(5)].forEach(() => {
      operations.push(
        ...mock.map((operation) => {
          const date = generateDate(dateFrom, dateTo);
          return {
            ...operation,
            createdAt: date,
            updatedAt: date,
          };
        }),
      );
    });

    await queryInterface.bulkInsert('operations', operations, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('operations', null, {});
  },
};
