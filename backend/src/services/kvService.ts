import { createClient, RedisClientType } from 'redis';
import { logger } from '../utils/logger';

let redisClient: RedisClientType<any, any>;

(async () => {
  const client = createClient({
    username: 'default',
    password: 'lvYPE9h0AsW6PQU63QbVG2hvz1C70IqO',
    socket: {
      host: 'redis-19041.c228.us-central1-1.gce.redns.redis-cloud.com',
      port: 19041
    }
  });
  client.on('error', (err: any) => logger.error('Redis Client Error', err));
  await client.connect();
  redisClient = client as RedisClientType<any, any>;
})();

export { redisClient };

export const kvService = {
  async get(key: string): Promise<any> {
    const value = await redisClient.get(key);
    try {
    return value ? JSON.parse(value) : null;
    } catch {
      return value;
    }
  },
  async set(key: string, value: any): Promise<boolean> {
    const toStore = typeof value === 'string' ? value : JSON.stringify(value);
    await redisClient.set(key, toStore);
    return true;
  },
  async setUser(userId: string, profile: Record<string, any>): Promise<boolean> {
    await redisClient.hSet(`user:${userId}`, profile);
    return true;
  },
  async getUser(userId: string): Promise<Record<string, any>> {
    return await redisClient.hGetAll(`user:${userId}`);
  },
  async setActiveBetSlip(userId: string, betSlip: any): Promise<boolean> {
    await redisClient.set(`betslip:${userId}:active`, JSON.stringify(betSlip));
    return true;
  },
  async getActiveBetSlip(userId: string): Promise<any> {
    const val = await redisClient.get(`betslip:${userId}:active`);
    return val ? JSON.parse(val) : null;
  },
  async addBetSlipToHistory(userId: string, betslipId: string): Promise<boolean> {
    await redisClient.lPush(`betslip:${userId}:history`, betslipId);
    return true;
  },
  async getBetSlipHistory(userId: string, count: number = 10): Promise<string[]> {
    return await redisClient.lRange(`betslip:${userId}:history`, 0, count - 1);
  },
  async setBet(betId: string, bet: any): Promise<boolean> {
    await redisClient.set(`bet:${betId}`, JSON.stringify(bet));
    return true;
  },
  async getBet(betId: string): Promise<any> {
    const val = await redisClient.get(`bet:${betId}`);
    return val ? JSON.parse(val) : null;
  },
  async setGame(gameId: string, game: any): Promise<boolean> {
    await redisClient.set(`game:${gameId}`, JSON.stringify(game));
    return true;
  },
  async getGame(gameId: string): Promise<any> {
    const val = await redisClient.get(`game:${gameId}`);
    return val ? JSON.parse(val) : null;
  },
  async updateLeaderboard(board: string, userId: string, score: number): Promise<boolean> {
    await redisClient.zIncrBy(`leaderboard:${board}`, score, userId);
    return true;
  },
  async getLeaderboard(board: string, count: number = 10): Promise<any> {
  return await redisClient.zRangeWithScores(`leaderboard:${board}`, 0, count - 1);
  }
};
