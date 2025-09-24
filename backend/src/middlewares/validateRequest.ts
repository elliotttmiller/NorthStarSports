import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export default function validateRequest(
  schema: Joi.ObjectSchema,
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
  };
}
