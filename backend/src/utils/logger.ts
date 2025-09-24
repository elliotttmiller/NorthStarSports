import pino from "pino";

// Environment-based configuration
const isDevelopment = process.env.NODE_ENV !== "production";
const logLevel = process.env.LOG_LEVEL || (isDevelopment ? "debug" : "info");

const loggerConfig = {
  level: logLevel,
  ...(isDevelopment && {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "SYS:standard",
        ignore: "pid,hostname",
        messageFormat: "[{levelLabel}] {msg}",
      },
    },
  }),
  ...(!isDevelopment && {
    formatters: {
      level: (label: string) => ({ level: label.toUpperCase() }),
    },
    timestamp: pino.stdTimeFunctions.isoTime,
  }),
};



const logger = pino(loggerConfig);

export function logInfo(message: string, context?: Record<string, unknown>) {
  logger.info({ ...context }, message);
}

export function logWarn(message: string, context?: Record<string, unknown>) {
  logger.warn({ ...context }, message);
}

export function logError(message: string, context?: Record<string, unknown>) {
  logger.error({ ...context }, message);
}

export default logger;
