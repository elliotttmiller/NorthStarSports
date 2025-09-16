const pino = require('pino');

// Create a pino logger instance with pretty printing for local development
const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: { colorize: true }
  }
});
module.exports = logger;

module.exports.logInfo = function(msg: string) {
  logger.info(msg);
};
module.exports.logError = function(msg: string) {
  logger.error(msg);
};
