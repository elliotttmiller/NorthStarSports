import { betSchema, gameSchema, userSchema } from "./schemas";

export function validateBet(data: unknown) {
  return betSchema.validate(data);
}

export function validateGame(data: unknown) {
  return gameSchema.validate(data);
}

export function validateUser(data: unknown) {
  return userSchema.validate(data);
}
