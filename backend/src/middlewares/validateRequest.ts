import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export default function validateRequest(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.validate(req.body);
    if (result.error) {
      const errorMessage = result.error.details[0]?.message || "Validation failed";
      // logWarn can be replaced with console.warn or your logger
      console.warn("Request validation failed", {
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
