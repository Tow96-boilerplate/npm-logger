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
import winston from 'winston';

const logs_folder = process.env.LOGGER_FOLDER || `${__dirname}/../../../logs`;

const logger = winston.createLogger({
  transports: [
    // -Write all logs with level `error` and below to `error.log`
    new winston.transports.File({
      level: 'error',
      maxsize: 2 * 1024 * 1024, // 2MB
      maxFiles: 10,
      filename: `${logs_folder}/error.log`,
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.simple(),
        winston.format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
      ),
    }),
    // -Write all logs with level `info` and below to `combined.log`
    new winston.transports.File({
      level: 'info',
      maxsize: 2 * 1024 * 1024, // 2MB
      maxFiles: 10,
      filename: `${logs_folder}/combined.log`,
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.simple(),
        winston.format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
      ),
    }),
  ],
});

// If not in production then the logs will also be added to the `console`
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      level: 'silly',
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
  );
}

export default logger;
