import { getEnv } from '#config/environment';
import { Sequelize } from 'sequelize';
import fs from 'fs';
import path from 'path';
import log from '#middleware/logs/logger.middleware';

const env = getEnv();
const requiredEnvVars = [
  'DB_NAME',
  'DB_USER',
  'DB_PASSWORD',
  'DB_HOST',
  'DB_PORT',
  'DB_SSL',
  'DB_SYNC',
];

requiredEnvVars.forEach((envVar) => {
  if (!env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

if (!env.DB_PORT || isNaN(Number(env.DB_PORT))) {
  throw new Error('DB_PORT must be a valid number.');
}

if (env.DB_POOL_MAX && isNaN(env.DB_POOL_MAX)) {
  throw new Error('DB_POOL_MAX must be a valid number.');
}

let sslCa = undefined;

if (env.DB_SSL === 'true' && env.DB_SSL_CA_PATH) {
  try {
    sslCa = fs.readFileSync(path.resolve(env.DB_SSL_CA_PATH));
  } catch (error) {
    log.error('🟥 Failed to read SSL CA certificate:', error);
    throw new Error('SSL CA certificate could not be loaded.');
  }
}

const configSequelize = {
  host: env.DB_HOST,
  port: Number(env.DB_PORT) || 5432,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: env.DB_SSL_REJECT_UNAUTHORIZED === 'true',
      ca: sslCa,
    },
  },
  timezone: env.DB_TIMEZONE || '+00:00',
  logging:
    env.NODE_ENV === 'production'
      ? false
      : (msg, executionTime) => log.debug(`🟦 ${msg} [⏱️  ${executionTime ?? '-'} ms]`),
  benchmark: true,
  pool: {
    max: parseInt(env.DB_POOL_MAX, 10) || 20,
    min: parseInt(env.DB_POOL_MIN, 10) || 5,
    acquire: parseInt(env.DB_POOL_ACQUIRE, 10) || 30000,
    idle: parseInt(env.DB_POOL_IDLE, 10) || 15000,
  },
};

const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, configSequelize);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    log.info('🟦 Database connection established successfully.');

    if (env.DB_SYNC === 'true') {
      if (env.DB_SYNC_FORCE === 'true') {
        log.warn('⚠️ Synchronizing database with { force: true } (data will be lost)');
        await sequelize.sync({ force: true });
      } else if (env.DB_SYNC_ALTER === 'true') {
        log.warn('⚠️ Synchronizing database with { alter: true }');
        await sequelize.sync({ alter: true });
      } else {
        log.info('ℹ️ Synchronizing database with default sync');
        await sequelize.sync();
      }
    } else {
      log.info('ℹ️ DB_SYNC is disabled. Skipping model synchronization.');
    }
  } catch (err) {
    log.error('🟥 Unable to connect to the database or sync:', err);
    process.exit(1);
  }
};

export { connectToDatabase };
export default sequelize;
