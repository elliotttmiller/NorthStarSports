import dotenv from 'dotenv';
dotenv.config();

const logger = require('./utils/logger');
import app from './app';

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

async function startServer() {
  logger.info('Starting backend server...');
  try {
    const server = app.listen(PORT, () => {
      logger.info({ msg: 'Express server running', url: `http://localhost:${PORT}` });
    });

    server.on('error', (err: NodeJS.ErrnoException) => {
      logger.error({ msg: 'Express server error', err });
      process.exit(1);
    });

    process.on('SIGINT', () => {
      logger.info('SIGINT received, shutting down server...');
      server.close(() => {
        logger.info('Server closed.');
        process.exit(0);
      });
    });
    process.on('SIGTERM', () => {
      logger.info('SIGTERM received, shutting down server...');
      server.close(() => {
        logger.info('Server closed.');
        process.exit(0);
      });
    });
  } catch (err) {
    logger.error({ msg: 'Fatal startup error', error: err });
    process.exit(1);
  }
}

startServer();
