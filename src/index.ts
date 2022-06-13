/** logger.ts
 * Copyright (c) 2021, Jose Tow
 * All rights reserved.
 *
 * Winston logger utility
 */

// levels = {
//   error: 0,
//   warn: 1,
//   info: 2,
//   http: 3,
//   verbose: 4,
//   debug: 5,
//   silly: 6
// };
import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const logsFolder = process.env.LOGGER_FOLDER || `${__dirname}/../../../logs`;
const loggingDisabled = (process.env.DISABLE_LOGGING || 'false').toLowerCase() === 'true';
const singleLogs = (process.env.SINGLE_LOGS || 'false').toLowerCase() === 'true';

const logger = winston.createLogger({
  transports: [
    // Console Logging --------------------------------------------------------------------------------------------------
    new winston.transports.Console({
      silent: process.env.NODE_ENV === 'production',
      level: 'silly',
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
  ],
});

// SINGLE LOGS --------------------------------------------------------------------------------------------------------
if (!loggingDisabled && singleLogs) {
  logger.add(
    // Write all logs with level `error` and below to `error.log`
    new winston.transports.File({
      level: 'error',
      maxsize: 2 * 1024 * 1024, // 2MB
      maxFiles: 10,
      filename: `${logsFolder}/error.log`,
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.simple(),
        winston.format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
      ),
    }),
  );

  // Write all logs with level `info` and below to `combined.log`
  logger.add(
    new winston.transports.File({
      level: 'http',
      maxsize: 2 * 1024 * 1024, // 2MB
      maxFiles: 10,
      filename: `${logsFolder}/combined.log`,
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.simple(),
        winston.format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
      ),
    }),
  );
}
// DAILY ROTATED LOGS ------------------------------------------------------------------------------------------------

if (!loggingDisabled && !singleLogs) {
  // Error logs
  logger.add(
    new DailyRotateFile({
      level: 'error',
      maxFiles: '30d',
      filename: `${logsFolder}/Error/%DATE%.log`,
      datePattern: 'YYYYMMDD',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.simple(),
        winston.format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
      ),
      zippedArchive: true,
    }),
  );

  // Combined Logs
  logger.add(
    new DailyRotateFile({
      level: 'http',
      maxFiles: '30d',
      filename: `${logsFolder}/Combined/%DATE%.log`,
      datePattern: 'YYYYMMDD',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.simple(),
        winston.format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
      ),
      zippedArchive: true,
    }),
  );
}

export default logger;
