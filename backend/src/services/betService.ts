import { kvService, connectRedis } from "./kvService.js";
import { logInfo } from "../utils/logger.js";

// Initialize Redis connection
connectRedis().catch(console.error);

export async function getBet(betId: string): Promise<any> {
  logInfo("betService.getBet called", { betId });
  return await kvService.getBet(betId);
}

export async function setBet(betId: string, bet: any): Promise<boolean> {
  logInfo("betService.setBet called", { betId });
  return await kvService.setBet(betId, bet);
}

export async function getUserBets(userId: string): Promise<any[]> {
  logInfo("betService.getUserBets called", { userId });
  const betslipIds = await kvService.getBetSlipHistory(userId, 100);
  if (!betslipIds || betslipIds.length === 0) return [];

  const bets = await Promise.all(
    betslipIds.map(async (betId: string) => {
      const bet = await kvService.getBet(betId);
      return bet ? { ...bet, id: betId } : null;
    }),
  );

  const validBets = bets.filter(Boolean);
  logInfo("betService.getUserBets success", {
    userId,
    count: validBets.length,
  });
  return validBets;
}
