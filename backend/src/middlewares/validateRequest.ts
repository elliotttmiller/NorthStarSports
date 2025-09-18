import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { logWarn } from "../utils/logger.js";

export default function validateRequest(
  schema: Joi.ObjectSchema,
): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.validate(req.body);
    if (result.error) {
      const errorMessage =
        result.error.details[0]?.message || "Validation failed";
      logWarn("Request validation failed", {
        path: req.path,
        method: req.method,
        error: errorMessage,
        body: req.body,
      });
      res.status(400).json({
        success: false,
        error: {
          message: errorMessage,
          code: 400,
        },
      });
      return;
    }
    next();
  };
}
