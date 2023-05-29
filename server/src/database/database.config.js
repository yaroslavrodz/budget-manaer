require('dotenv').config();

module.exports = {
  development: {
    dialect: 'postgres',
    database: process.env.POSTGRES_NAME,
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
  },
  test: {
    dialect: 'postgres',
    database: process.env.POSTGRES_NAME,
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
  },
  production: {
    dialect: 'postgres',
    database: process.env.POSTGRES_NAME,
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
  },
};
