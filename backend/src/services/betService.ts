import { kvService, connectRedis } from "./kvService.js";

connectRedis().catch(console.error);

export async function getBet(betId: string) {
  console.info("betService.getBet called", { betId });
  return await kvService.getBet(betId);
}

export async function setBet(betId: string, bet: Record<string, unknown>) {
  console.info("betService.setBet called", { betId });
  return await kvService.setBet(betId, bet);
}

export async function getUserBets(userId: string) {
  console.info("betService.getUserBets called", { userId });
  const betslipIds = await kvService.getBetSlipHistory(userId, 100);
  if (!betslipIds || betslipIds.length === 0) return [];
  const bets = await Promise.all(
    betslipIds.map(async (betId: string) => {
      const bet = await kvService.getBet(betId);
      return bet ? { ...bet, id: betId } : null;
    })
  );
  const validBets = bets.filter(Boolean);
  console.info("betService.getUserBets success", {
    userId,
    count: validBets.length,
  });
  return validBets;
}
