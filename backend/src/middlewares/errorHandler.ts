import { Request, Response, NextFunction } from "express";

// Centralized error handler middleware
export default function errorHandler(
  req: Request,
  res: Response,
) {
    path: req.path,
    method: req.method,
    body: req.body,
    params: req.params,
    query: req.query,
  });

  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    success: false,
    error: {
      message,
      code: status,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
  });
}
