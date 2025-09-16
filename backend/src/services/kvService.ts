console.log('TEST: Top of kvService.ts');
import { createClient, RedisClientType } from 'redis';
const logger = require('../utils/logger');

let redisClient: RedisClientType<any, any>;
let redisReady: Promise<void>;

function connectRedis() {
  if (redisReady) return redisReady;
  const client = createClient({
    username: 'default',
    password: 'lvYPE9h0AsW6PQU63QbVG2hvz1C70IqO',
    socket: {
      host: 'redis-19041.c228.us-central1-1.gce.redns.redis-cloud.com',
      port: 19041
    }
  });
  client.on('error', (err: any) => {
    logger.error({ msg: 'Redis Client Error', error: err });
    console.error('Redis Client Error:', err);
  });
  redisReady = client.connect().then(() => {
    redisClient = client as RedisClientType<any, any>;
    logger.info('Redis connected');
    console.log('Redis connected');
  }).catch((err) => {
    logger.error({ msg: 'Redis connection failed', error: err });
    console.error('Redis connection failed:', err);
    throw err;
  });
  return redisReady;
}

export { redisClient, connectRedis, redisReady };

export const kvService = {
  async get(key: string): Promise<any> {
    logger.info({ msg: 'kvService.get called', key });
    await redisReady;
    const value = await redisClient.get(key);
    try {
      logger.info({ msg: 'kvService.get success', key, value });
      return value ? JSON.parse(value) : null;
    } catch (e) {
      logger.error({ msg: 'Failed to parse Redis value', error: e, value });
      return value;
    }
  },
  async set(key: string, value: any): Promise<boolean> {
    logger.info({ msg: 'kvService.set called', key, value });
    await redisReady;
    const toStore = typeof value === 'string' ? value : JSON.stringify(value);
    await redisClient.set(key, toStore);
    logger.info({ msg: 'kvService.set success', key });
    return true;
  },
  async setUser(userId: string, profile: Record<string, any>): Promise<boolean> {
    await redisReady;
    try {
      await redisClient.hSet(`user:${userId}`, profile);
      return true;
    } catch (err) {
      logger.error({ msg: 'Redis Client Error in setUser', error: err });
      throw err;
    }
  },
  async getUser(userId: string): Promise<Record<string, any>> {
    await redisReady;
    return await redisClient.hGetAll(`user:${userId}`);
  },
  async setActiveBetSlip(userId: string, betSlip: any): Promise<boolean> {
    await redisReady;
    try {
      await redisClient.set(`betslip:${userId}:active`, JSON.stringify(betSlip));
      return true;
    } catch (err) {
      logger.error({ msg: 'Redis Client Error in setActiveBetSlip', error: err });
      throw err;
    }
  },
  async getActiveBetSlip(userId: string): Promise<any> {
    await redisReady;
    const val = await redisClient.get(`betslip:${userId}:active`);
    return val ? JSON.parse(val) : null;
  },
  async addBetSlipToHistory(userId: string, betslipId: string): Promise<boolean> {
    await redisReady;
    await redisClient.lPush(`betslip:${userId}:history`, betslipId);
    return true;
  },
  async getBetSlipHistory(userId: string, count: number = 10): Promise<string[]> {
    await redisReady;
    return await redisClient.lRange(`betslip:${userId}:history`, 0, count - 1);
  },
  async setBet(betId: string, bet: any): Promise<boolean> {
    await redisReady;
    await redisClient.set(`bet:${betId}`, JSON.stringify(bet));
    return true;
  },
  async getBet(betId: string): Promise<any> {
    await redisReady;
    const val = await redisClient.get(`bet:${betId}`);
    return val ? JSON.parse(val) : null;
  },
  async setGame(gameId: string, game: any): Promise<boolean> {
    await redisReady;
    await redisClient.set(`game:${gameId}`, JSON.stringify(game));
    return true;
  },
  async getGame(gameId: string): Promise<any> {
    await redisReady;
    const val = await redisClient.get(`game:${gameId}`);
    return val ? JSON.parse(val) : null;
  },
  async updateLeaderboard(board: string, userId: string, score: number): Promise<boolean> {
    await redisReady;
    await redisClient.zIncrBy(`leaderboard:${board}`, score, userId);
    return true;
  },
  async getLeaderboard(board: string, count: number = 10): Promise<any> {
    await redisReady;
    return await redisClient.zRangeWithScores(`leaderboard:${board}`, 0, count - 1);
  }
};
