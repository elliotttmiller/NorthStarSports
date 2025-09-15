import { createClient } from 'redis';
import { logger } from './logger'; // Adjust the path as necessary

let redisClient;

(async () => {
  const client = createClient({
    username: 'default',
    password: 'lvYPE9h0AsW6PQU63QbVG2hvz1C70IqO',
    socket: {
      host: 'redis-19041.c228.us-central1-1.gce.redns.redis-cloud.com',
      port: 19041
    }
  });
  client.on('error', err => logger.error('Redis Client Error', err));
  await client.connect();
  redisClient = client;
})();

export { redisClient };

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
  ,
  // User profile (hash)
  async setUser(userId, profile) {
    await redisClient.hSet(`user:${userId}`, profile);
    return true;
  },
  async getUser(userId) {
    return await redisClient.hGetAll(`user:${userId}`);
  },
  // Active betslip (JSON string)
  async setActiveBetSlip(userId, betSlip) {
    await redisClient.set(`betslip:${userId}:active`, JSON.stringify(betSlip));
    return true;
  },
  async getActiveBetSlip(userId) {
    const val = await redisClient.get(`betslip:${userId}:active`);
    return val ? JSON.parse(val) : null;
  },
  // Bet history (list)
  async addBetSlipToHistory(userId, betslipId) {
    await redisClient.lPush(`betslip:${userId}:history`, betslipId);
    return true;
  },
  async getBetSlipHistory(userId, count = 10) {
    return await redisClient.lRange(`betslip:${userId}:history`, 0, count - 1);
  },
  // Bet (JSON string)
  async setBet(betId, bet) {
    await redisClient.set(`bet:${betId}`, JSON.stringify(bet));
    return true;
  },
  async getBet(betId) {
    const val = await redisClient.get(`bet:${betId}`);
    return val ? JSON.parse(val) : null;
  },
  // Game (JSON string)
  async setGame(gameId, game) {
    await redisClient.set(`game:${gameId}`, JSON.stringify(game));
    return true;
  },
  async getGame(gameId) {
    const val = await redisClient.get(`game:${gameId}`);
    return val ? JSON.parse(val) : null;
  },
  // Leaderboard (sorted set)
  async updateLeaderboard(board, userId, score) {
    await redisClient.zIncrBy(`leaderboard:${board}`, score, userId);
    return true;
  },
  async getLeaderboard(board, count = 10) {
    return await redisClient.zRevRangeWithScores(`leaderboard:${board}`, 0, count - 1);
  }
};
