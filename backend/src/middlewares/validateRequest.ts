import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export default function validateRequest(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, error: { message: error.details[0].message, code: 400 } });
    }
    next();
  };
}
