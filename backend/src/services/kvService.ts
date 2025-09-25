import { createClient } from "redis";

const redisClient = createClient({
  username: process.env.REDIS_USERNAME || "default",
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT) || 6379,
  },
});

let redisReady: Promise<void> | null = null;
function logInfo(msg: string, obj?: Record<string, unknown>) {
  if (obj) {
    console.log(msg, obj);
  } else {
    console.log(msg);
  }
}

function connectRedis(): Promise<void> {
  if (redisReady) return redisReady;
  redisClient.on("connect", () => {
    logInfo("Redis client connecting...");
  });
  redisClient.on("ready", () => {
    logInfo("✅ Redis client ready");
  });
  redisReady = redisClient.connect().then(() => {
    logInfo("🔌 Redis connected successfully", {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    });
  });
  return redisReady;
}


export { redisClient, connectRedis, redisReady };

export const kvService = {
  async get(key: string): Promise<string | object | null> {
    logInfo("kvService.get called", { key });
    await connectRedis();
    const value = await redisClient.get(key);
    logInfo("kvService.get success", { key, hasValue: !!value });
    if (!value) return null;
    try {
      return JSON.parse(value);
    } catch {
      logInfo("Returning non-JSON value as string", { key, value });
      return value;
    }
  },

  async set(key: string, value: string | object): Promise<boolean> {
    logInfo("kvService.set called", { key, type: typeof value });
    await connectRedis();
    const toStore = typeof value === "string" ? value : JSON.stringify(value);
    await redisClient.set(key, toStore);
    logInfo("kvService.set success", { key });
    return true;
  },

  async setUser(userId: string, profile: Record<string, string | number | boolean | object | null>): Promise<boolean> {
    await connectRedis();
    try {
      const fields: string[] = [];
      for (const [key, value] of Object.entries(profile)) {
        fields.push(key, typeof value === "string" ? value : JSON.stringify(value));
      }
      await redisClient.hSet(`user:${userId}`, fields);
      logInfo("kvService.setUser success", { userId });
      return true;
    } catch (err) {
      throw err;
    }
  },

  async getUser(userId: string): Promise<Record<string, string> | null> {
    await connectRedis();
    const user = await redisClient.hGetAll(`user:${userId}`);
    logInfo("kvService.getUser", { userId, hasData: Object.keys(user).length > 0 });
    return Object.keys(user).length > 0 ? user : null;
  },

  async setActiveBetSlip(userId: string, betSlip: Record<string, unknown>): Promise<boolean> {
    await connectRedis();
    try {
      await redisClient.set(`betslip:${userId}:active`, JSON.stringify(betSlip), { EX: 60 * 60 });
      logInfo("kvService.setActiveBetSlip success", { userId });
      return true;
    } catch (err) {
      logInfo("kvService.setActiveBetSlip error", { userId });
      throw err;
    }
  },

  async getActiveBetSlip(userId: string): Promise<Record<string, unknown> | null> {
    await connectRedis();
    const val = await redisClient.get(`betslip:${userId}:active`);
    logInfo("kvService.getActiveBetSlip", { userId, hasData: !!val });
    return val ? JSON.parse(val) : null;
  },

  async addBetSlipToHistory(userId: string, betslipId: string): Promise<boolean> {
    await connectRedis();
    await redisClient.lPush(`betslip:${userId}:history`, betslipId);
    logInfo("kvService.addBetSlipToHistory success", { userId, betslipId });
    return true;
  },

  async getBetSlipHistory(userId: string, count: number = 10): Promise<string[]> {
    await connectRedis();
    const history = await redisClient.lRange(`betslip:${userId}:history`, 0, count - 1);
    logInfo("kvService.getBetSlipHistory", { userId, count: history.length });
    return history;
  },

  async setBet(betId: string, bet: Record<string, unknown>): Promise<boolean> {
    await connectRedis();
    await redisClient.set(`bet:${betId}`, JSON.stringify(bet), { EX: 60 * 60 * 24 });
    logInfo("kvService.setBet success", { betId });
    return true;
  },

  async getBet(betId: string): Promise<Record<string, unknown> | null> {
    await connectRedis();
    const val = await redisClient.get(`bet:${betId}`);
    logInfo("kvService.getBet", { betId, hasData: !!val });
    return val ? JSON.parse(val) : null;
  },

  async setGame(gameId: string, game: Record<string, unknown>): Promise<boolean> {
    await connectRedis();
    await redisClient.set(`game:${gameId}`, JSON.stringify(game), { EX: 60 * 60 * 24 });
    logInfo("kvService.setGame success", { gameId });
    return true;
  },

  async getGame(gameId: string): Promise<Record<string, unknown> | null> {
    await connectRedis();
    const val = await redisClient.get(`game:${gameId}`);
    logInfo("kvService.getGame", { gameId, hasData: !!val });
    return val ? JSON.parse(val) : null;
  },

  async updateLeaderboard(board: string, userId: string, score: number): Promise<boolean> {
    await connectRedis();
    await redisClient.zIncrBy(`leaderboard:${board}`, score, userId);
    logInfo("kvService.updateLeaderboard success", { board, userId, score });
    return true;
  },

  async getLeaderboard(board: string, count: number = 10): Promise<{ score: number; value: string }[]> {
    await connectRedis();
    const leaderboard = await redisClient.zRangeWithScores(`leaderboard:${board}`, 0, count - 1);
    logInfo("kvService.getLeaderboard", { board, count: leaderboard.length });
    return leaderboard;
  },
};
