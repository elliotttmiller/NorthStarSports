import { Request, Response, NextFunction } from 'express';

// Centralized error handler middleware
export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  res.status(err.status || 500).json({ success: false, error: { message: err.message || 'Internal Server Error', code: err.status || 500 } });
}
