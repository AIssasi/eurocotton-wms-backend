const winston = require('winston');
require('winston-daily-rotate-file');
const path = require('path');
const fs = require('fs');

// Define severity levels for logging
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define colors for each severity level to improve log visibility
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

// Tell Winston to use the custom colors
winston.addColors(colors);

// Define the format for log messages
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.printf(
    (info) => `[${info.timestamp} ${info.level}]: ${info.message}`
  )
);

// Create a logger instance with proper configuration
const createLogger = () => {
  // Determine the logging level based on the environment
  const env = process.env.NODE_ENV || 'development';
  const logLevel = env === 'development' ? 'debug' : 'debug'; // Use 'debug' to capture all logs

  // Ensure the log directory exists; create it if it doesn't
  const logDir = path.resolve(process.cwd(), 'logs');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  return winston.createLogger({
    level: logLevel, // Set the logging level
    levels, // Define severity levels
    format: logFormat, // Set the log message format
    transports: [
      // Console transport for real-time log output
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(), // Add color to console output
          logFormat // Apply the log format
        ),
      }),
      // DailyRotateFile transport for error level logs
      new winston.transports.DailyRotateFile({
        filename: path.join(logDir, 'error-%DATE%.log'),
        datePattern: 'YYYY-MM-DD',
        level: 'error', // Only logs errors to this file
      }),
      // DailyRotateFile transport for all logs
      new winston.transports.DailyRotateFile({
        filename: path.join(logDir, 'all-%DATE%.log'),
        datePattern: 'YYYY-MM-DD',
        level: 'debug', // Logs all levels (including debug) to this file
      }),
    ],
  });
};

// Create and export the logger instance
const logger = createLogger();
module.exports = logger;