
import Joi from "joi";

export const userSchema = Joi.object({
  username: Joi.string().min(2).max(32).required(),
  email: Joi.string().email().required(),
  balance: Joi.number().min(0).required(),
  betHistory: Joi.array().items(Joi.string()).required(),
  // Add more fields as needed
});

export const betSchema = Joi.object({
  amount: Joi.number().required(),
  date: Joi.string().required(),
  // Add more fields as needed
});

export const gameSchema = Joi.object({
  // Add more fields as needed
});
