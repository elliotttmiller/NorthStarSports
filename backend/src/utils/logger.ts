import pino from 'pino';
import type { Logger } from 'pino';

// Environment-based configuration
const isDevelopment = process.env.NODE_ENV !== 'production';
const logLevel = process.env.LOG_LEVEL || (isDevelopment ? 'debug' : 'info');

// Create logger configuration
const loggerConfig = {
  level: logLevel,
  ...(isDevelopment && {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
        messageFormat: '[{levelLabel}] {msg}'
      }
    }
  }),
  ...(!isDevelopment && {
    formatters: {
      level: (label: string) => ({ level: label.toUpperCase() }),
    },
    timestamp: pino.stdTimeFunctions.isoTime,
  })
};

// Create logger instance
const logger: Logger = pino(loggerConfig);

// Enhanced logging functions with context support
export function logInfo(message: string | object, context?: Record<string, any>): void {
  if (typeof message === 'string') {
    logger.info(context, message);
  } else {
    logger.info(message);
  }
}

export function logError(message: string | object, error?: Error, context?: Record<string, any>): void {
  if (error) {
    logger.error({ err: error, ...context }, typeof message === 'string' ? message : 'Error occurred');
  } else if (typeof message === 'string') {
    logger.error(context, message);
  } else {
    logger.error(message);
  }
}

export function logWarn(message: string | object, context?: Record<string, any>): void {
  if (typeof message === 'string') {
    logger.warn(context, message);
  } else {
    logger.warn(message);
  }
}

export function logDebug(message: string | object, context?: Record<string, any>): void {
  if (typeof message === 'string') {
    logger.debug(context, message);
  } else {
    logger.debug(message);
  }
}

// Create child logger with context
export const createLogger = (context: Record<string, any>): Logger => {
  return logger.child(context);
};

// Default export for backward compatibility
export default logger;
