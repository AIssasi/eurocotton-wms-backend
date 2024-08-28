const { Sequelize } = require('sequelize');
const log = require('@middleware/logs/logger');
const defineModels = require('@models'); // Asegúrate de que esta ruta sea correcta

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;

const sequelize = new Sequelize('', DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
  logging: (msg) => log.debug(`🟦 ${msg}`),
});

async function initializeDatabase() {
  try {
    log.info('🟦 Starting database initialization');

    await sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    log.info('🟩 Database checked/created if not exists - [SUCCESS]');

    //await sequelize.close();

    const sequelizeWithDB = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
      host: DB_HOST,
      dialect: 'mysql',
      logging: (msg) => log.debug(`🟦 ${msg}`),
    });

    const models = defineModels(sequelizeWithDB);

    await sequelizeWithDB.sync({ alter: false, force: false });
    log.info('🟩 Database synchronization - [SUCCESS]');

    return { sequelize: sequelizeWithDB, models };
  } catch (error) {
    log.error(`🟥 Database initialization/synchronization - [ERROR] - [${error.message}]`);

    process.exit(1);
    return error;
  }
}

module.exports = initializeDatabase;
