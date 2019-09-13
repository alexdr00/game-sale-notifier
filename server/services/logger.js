const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, errors, colorize, metadata } = format;

const customFormat = printf(({ level, message, metadata }) => {
  let error = metadata.error ? ': ' + metadata.error.stack : '';
  return `(${metadata.timestamp}) - [${level}] ${message}${error}`
});

const logger = createLogger({
  level: 'info',
  transports: [
    new transports.File({
      filename: `${__dirname}/../logs/info.log`,
      level: 'info',
    }),
    new transports.File({
      filename: `${__dirname}/../logs/errors.log`,
      level: 'error',
      format: combine(
        errors({ stack: true })
      ),
    }),
  ],
  format: combine(
    timestamp({ format: 'YYYY-MMM-D hh:mm:ss' }),
    metadata(),
    customFormat,
  )
});
const isProductionEnv = process.env.NODE_ENV === 'production';
if (!isProductionEnv) {
  logger.add(new transports.Console({
    level: 'debug',
    format: combine(
      colorize({ all: true }),
    )
  }));
  logger.add(new transports.File({
    filename: `${__dirname}/../logs/debug.log`,
    level: 'debug',
    format: combine(
      customFormat,
    )
  }))
}

module.exports = logger;