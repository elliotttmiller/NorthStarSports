import { kvService } from './kvService';

export async function getBet(betId: string) {
  return await kvService.getBet(betId);
}

export async function setBet(betId: string, bet: any) {
  return await kvService.setBet(betId, bet);
}

export async function getUserBets(userId: string) {
  const betslipIds = await kvService.getBetSlipHistory(userId, 100);
  if (!betslipIds || betslipIds.length === 0) return [];
  const bets = await Promise.all(
    betslipIds.map(async (betId: string) => {
      const bet = await kvService.getBet(betId);
      return bet ? { ...bet, id: betId } : null;
    })
  );
  return bets.filter(Boolean);
}
