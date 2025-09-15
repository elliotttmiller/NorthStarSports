import pino from 'pino';

const logger = pino();

// Simple logger utility (can be replaced with winston later)
export function logInfo(msg) {
  logger.info(msg);
}
export function logError(msg) {
  logger.error(msg);
}
