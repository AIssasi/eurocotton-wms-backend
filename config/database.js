// config/database.js

const { Sequelize } = require('sequelize');
const log = require('@middleware/logs/logger.middleware');

const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_TIMEZONE,
  DB_POOL_MAX,
  DB_POOL_MIN,
  DB_POOL_ACQUIRE,
  DB_POOL_IDLE,
  DB_SSL,
  DB_SSL_REJECT_UNAUTHORIZED,
} = process.env;

if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST) {
  throw new Error('Database configuration is incomplete. Please check your environment variables.');
}

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: Number(DB_PORT) || 5432,
  dialect: 'postgres',
  dialectOptions:
    DB_SSL === 'true'
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: DB_SSL_REJECT_UNAUTHORIZED === 'true',
          },
        }
      : {},
  timezone: DB_TIMEZONE || 'America/Mexico_City',
  logging: (msg, executionTime) => log.debug(`🟦 ${msg} [⏱️  ${executionTime ?? '-'} ms]`),
  benchmark: true,
  pool: {
    max: parseInt(DB_POOL_MAX, 10),
    min: parseInt(DB_POOL_MIN, 10),
    acquire: parseInt(DB_POOL_ACQUIRE, 10),
    idle: parseInt(DB_POOL_IDLE, 10),
  },
});

module.exports = sequelize;
