const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, errors, colorize, uncolorize, metadata } = format;

const customFormat = printf(({ level, message, metadata }) => {
  let detail;
  if (metadata.detail) {
    detail = metadata.detail.stack ? metadata.detail.stack : metadata.detail;
    detail = ': ' + detail;
  } else {
    detail = '';
  }

  return `(${metadata.timestamp}) - [${level}] ${message}${detail}`
});

const logger = createLogger({
  level: 'info',
  transports: [
    new transports.File({
      filename: `${__dirname}/../logs/info.log`,
      level: 'info',
      format: combine(
        uncolorize(),
      ),
    }),
    new transports.File({
      filename: `${__dirname}/../logs/errors.log`,
      level: 'error',
      format: combine(
        uncolorize(),
        errors({ stack: true })
      ),
    }),
  ],
  format: combine(
    timestamp({ format: 'YYYY-MMM-D hh:mm:ss' }),
    metadata(),
    colorize({ all: true }),
    customFormat,
  )
});
const isProductionEnv = process.env.NODE_ENV === 'production';
if (!isProductionEnv) {
  logger.add(new transports.Console({ level: 'debug' }));
  logger.add(new transports.File({
    filename: `${__dirname}/../logs/debug.log`,
    level: 'debug',
    format: combine(
      uncolorize(),
      customFormat,
    )
  }))
}

module.exports = logger;
