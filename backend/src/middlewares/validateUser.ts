import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const userSchema = Joi.object({
  username: Joi.string().min(2).max(32).required(),
  email: Joi.string().email().required(),
  balance: Joi.number().min(0).required(),
  depositHistory: Joi.array().items(
    Joi.object({
      amount: Joi.number().required(),
      date: Joi.string().required()
    })
  ).required(),
  betHistory: Joi.array().items(Joi.string()).required()
});

export default function validateUser(req: Request, res: Response, next: NextFunction) {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, error: { message: error.details[0].message, code: 400 } });
  }
  next();
}
