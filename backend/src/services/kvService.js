

import { createClient } from 'redis';

const client = createClient({
  username: 'default',
  password: 'lvYPE9h0AsW6PQU63QbVG2hvz1C70IqO',
  socket: {
    host: 'redis-19041.c228.us-central1-1.gce.redns.redis-cloud.com',
    port: 19041
  }
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

export const redisClient = client;

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
