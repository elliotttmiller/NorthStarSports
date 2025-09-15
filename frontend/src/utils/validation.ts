import { z } from 'zod';

export const userSchema = z.object({
  username: z.string().min(2).max(32),
  email: z.string().email(),
  balance: z.number().min(0),
  depositHistory: z.array(z.object({ amount: z.number(), date: z.string() })),
  betHistory: z.array(z.string())
});

export const betSchema = z.object({
  id: z.string(),
  userId: z.string(),
  amount: z.number(),
  type: z.string(),
  legs: z.array(z.any()).optional()
});
// Add more schemas as needed
