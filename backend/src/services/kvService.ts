import { createClient, RedisClientType } from 'redis';
import { logInfo, logError } from '../utils/logger.js';

let redisClient: RedisClientType<any, any>;
let redisReady: Promise<void>;

function connectRedis(): Promise<void> {
  if (redisReady) return redisReady;
  
  const client = createClient({
    username: process.env.REDIS_USERNAME || 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT) || 6379
    }
  });

  client.on('error', (err: any) => {
    logError('Redis Client Error', err);
  });

  client.on('connect', () => {
    logInfo('Redis client connecting...');
  });

  client.on('ready', () => {
    logInfo('✅ Redis client ready');
  });

  redisReady = client.connect().then(() => {
    redisClient = client as RedisClientType<any, any>;
    logInfo('🔌 Redis connected successfully', {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
    });
  }).catch((err) => {
    logError('💥 Redis connection failed', err);
    throw err;
  });

  return redisReady;
}

export { redisClient, connectRedis, redisReady };

export const kvService = {
  async get(key: string): Promise<any> {
    logInfo('kvService.get called', { key });
    await redisReady;
    const value = await redisClient.get(key);
    logInfo('kvService.get success', { key, hasValue: !!value });
    
    if (!value) return null;
    
    // Try to parse as JSON, but return as string if it fails
    try {
      return JSON.parse(value);
    } catch (e) {
      // If it's not valid JSON, return the string value directly
      logInfo('Returning non-JSON value as string', { key, value });
      return value;
    }
  },

  async set(key: string, value: any): Promise<boolean> {
    logInfo('kvService.set called', { key, type: typeof value });
    await redisReady;
    const toStore = typeof value === 'string' ? value : JSON.stringify(value);
    await redisClient.set(key, toStore);
    logInfo('kvService.set success', { key });
    return true;
  },

  async setUser(userId: string, profile: Record<string, any>): Promise<boolean> {
    await redisReady;
    try {
      // Convert profile object to field-value pairs for Redis hSet
      const fields: string[] = [];
      for (const [key, value] of Object.entries(profile)) {
        fields.push(key, typeof value === 'string' ? value : JSON.stringify(value));
      }
      await redisClient.hSet(`user:${userId}`, fields);
      logInfo('kvService.setUser success', { userId });
      return true;
    } catch (err) {
      logError('Redis Client Error in setUser', err as Error, { userId });
      throw err;
    }
  },

  async getUser(userId: string): Promise<Record<string, any> | null> {
    await redisReady;
    const user = await redisClient.hGetAll(`user:${userId}`);
    logInfo('kvService.getUser', { userId, hasData: Object.keys(user).length > 0 });
    return Object.keys(user).length > 0 ? user : null;
  },

  async setActiveBetSlip(userId: string, betSlip: any): Promise<boolean> {
    await redisReady;
    try {
      await redisClient.set(`betslip:${userId}:active`, JSON.stringify(betSlip));
      logInfo('kvService.setActiveBetSlip success', { userId });
      return true;
    } catch (err) {
      logError('Redis Client Error in setActiveBetSlip', err as Error, { userId });
      throw err;
    }
  },

  async getActiveBetSlip(userId: string): Promise<any> {
    await redisReady;
    const val = await redisClient.get(`betslip:${userId}:active`);
    logInfo('kvService.getActiveBetSlip', { userId, hasData: !!val });
    return val ? JSON.parse(val) : null;
  },

  async addBetSlipToHistory(userId: string, betslipId: string): Promise<boolean> {
    await redisReady;
    await redisClient.lPush(`betslip:${userId}:history`, betslipId);
    logInfo('kvService.addBetSlipToHistory success', { userId, betslipId });
    return true;
  },

  async getBetSlipHistory(userId: string, count: number = 10): Promise<string[]> {
    await redisReady;
    const history = await redisClient.lRange(`betslip:${userId}:history`, 0, count - 1);
    logInfo('kvService.getBetSlipHistory', { userId, count: history.length });
    return history;
  },

  async setBet(betId: string, bet: any): Promise<boolean> {
    await redisReady;
    await redisClient.set(`bet:${betId}`, JSON.stringify(bet));
    logInfo('kvService.setBet success', { betId });
    return true;
  },

  async getBet(betId: string): Promise<any> {
    await redisReady;
    const val = await redisClient.get(`bet:${betId}`);
    logInfo('kvService.getBet', { betId, hasData: !!val });
    return val ? JSON.parse(val) : null;
  },

  async setGame(gameId: string, game: any): Promise<boolean> {
    await redisReady;
    await redisClient.set(`game:${gameId}`, JSON.stringify(game));
    logInfo('kvService.setGame success', { gameId });
    return true;
  },

  async getGame(gameId: string): Promise<any> {
    await redisReady;
    const val = await redisClient.get(`game:${gameId}`);
    logInfo('kvService.getGame', { gameId, hasData: !!val });
    return val ? JSON.parse(val) : null;
  },

  async updateLeaderboard(board: string, userId: string, score: number): Promise<boolean> {
    await redisReady;
    await redisClient.zIncrBy(`leaderboard:${board}`, score, userId);
    logInfo('kvService.updateLeaderboard success', { board, userId, score });
    return true;
  },

  async getLeaderboard(board: string, count: number = 10): Promise<any> {
    await redisReady;
    const leaderboard = await redisClient.zRangeWithScores(`leaderboard:${board}`, 0, count - 1);
    logInfo('kvService.getLeaderboard', { board, count: leaderboard.length });
    return leaderboard;
  }
};
