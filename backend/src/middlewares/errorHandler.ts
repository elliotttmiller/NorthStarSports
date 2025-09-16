import { Request, Response, NextFunction } from 'express';
const logger = require('../utils/logger');

// Centralized error handler middleware
export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  logger.error({ msg: 'Global error handler', error: err });
  res.status(err.status || 500).json({ success: false, error: { message: err.message || 'Internal Server Error', code: err.status || 500 } });
}
