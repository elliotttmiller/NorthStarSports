// Centralized config loader
import dotenv from "dotenv";
dotenv.config();

export const REDIS_HOST = process.env.REDIS_HOST;
export const REDIS_PORT = process.env.REDIS_PORT;
export const REDIS_USER = process.env.REDIS_USER;
export const REDIS_PASS = process.env.REDIS_PASS;
