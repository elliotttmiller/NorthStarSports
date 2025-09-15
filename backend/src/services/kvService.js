
import { createClient } from 'redis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
export const redisClient = createClient({ url: redisUrl });

redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});

// Connect on startup
redisClient.connect();

export const kvService = {
  async get(key) {
    const value = await redisClient.get(key);
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  },
  async set(key, value) {
    const toStore = typeof value === 'string' ? value : JSON.stringify(value);
    await redisClient.set(key, toStore);
    return true;
  }
};
