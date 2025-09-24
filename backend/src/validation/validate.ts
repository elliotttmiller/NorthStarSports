import { betSchema, gameSchema, userSchema } from "./schemas";

export function validateBet(data: unknown) {
  return betSchema.safeParse(data);
}

export function validateGame(data: unknown) {
  return gameSchema.safeParse(data);
}

export function validateUser(data: unknown) {
  return userSchema.safeParse(data);
}
