import { z } from "zod";

export const betSchema = z.object({
  amount: z.number().min(1),
  odds: z.number(),
  type: z.string(),
  userId: z.string(),
  gameId: z.string(),
  // Add more fields as needed
});

export const gameSchema = z.object({
  name: z.string(),
  date: z.string(),
  teams: z.array(z.string()),
  // Add more fields as needed
});

export const userSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  // Add more fields as needed
});
