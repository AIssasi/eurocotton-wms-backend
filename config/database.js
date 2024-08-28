// config/database.js

const { Sequelize } = require('sequelize');
const log = require('@middleware/logs/logger.middleware');

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
  logging: (msg) => log.debug(`🟦 ${msg}`),
});

module.exports = sequelize;
