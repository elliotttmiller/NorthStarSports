import pino from 'pino';

const logger = pino();
export { logger };

export function logInfo(msg: string): void {
  logger.info(msg);
}
export function logError(msg: string): void {
  logger.error(msg);
}
