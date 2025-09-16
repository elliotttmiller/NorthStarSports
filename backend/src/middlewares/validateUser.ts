import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { logWarn } from '../utils/logger.js';

// More flexible user schema for testing
const userSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  username: Joi.string().min(2).max(32).optional(),
  email: Joi.string().email().optional(),
  balance: Joi.number().min(0).optional(),
  preferences: Joi.object().optional(),
  profile: Joi.object().optional(),
  depositHistory: Joi.array().items(
    Joi.object({
      amount: Joi.number().required(),
      date: Joi.string().required()
    })
  ).optional(),
  betHistory: Joi.array().items(Joi.string()).optional()
}).min(1); // At least one field required

export default function validateUser(req: Request, res: Response, next: NextFunction): void {
  const userId = req.params.userId;
  if (!userId) {
    logWarn('Missing userId parameter in validation');
    res.status(400).json({
      success: false,
      error: {
        message: 'Missing userId parameter',
        code: 400
      }
    });
    return;
  }

  const { error } = userSchema.validate(req.body);
  if (error) {
    logWarn('User validation failed', {
      userId,
      error: error.details[0]?.message || 'Validation failed',
      body: req.body
    });
    res.status(400).json({
      success: false,
      error: {
        message: error.details[0]?.message || 'Validation failed',
        code: 400
      }
    });
    return;
  }
  next();
}
