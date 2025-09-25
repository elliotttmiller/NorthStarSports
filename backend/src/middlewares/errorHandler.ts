/**
 * Express error-handling middleware. Centralizes error formatting and response.
 * Keeps NextFunction parameter for compatibility, even if unused.
 */
export default function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  let status = 500;
  let message = "Internal Server Error";
  let stack: string | undefined = undefined;
  if (isAppError(err)) {
    if (typeof err.status === "number") {
      status = err.status;
    } else if (typeof err.statusCode === "number") {
      status = err.statusCode;
    }
    if (typeof err.message === "string") {
      message = err.message;
    }
    if (process.env.NODE_ENV === "development" && typeof err.stack === "string") {
      stack = err.stack;
    }
  }
  res.status(status).json({
    success: false,
    error: {
      message,
      code: status,
      ...(stack ? { stack } : {}),
    },
    request: {
      path: req.path,
      method: req.method,
      body: req.body,
      params: req.params,
      query: req.query,
    },
  });
}
import { Request, Response, NextFunction } from "express";
interface AppError {
  status?: number;
  statusCode?: number;
  message?: string;
  stack?: string;
}

function isAppError(err: unknown): err is AppError {
  return typeof err === "object" && err !== null && (
    "status" in err || "statusCode" in err || "message" in err || "stack" in err
  );
}

// Centralized error handler middleware
