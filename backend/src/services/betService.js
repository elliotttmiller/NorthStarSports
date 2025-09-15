import { kvService } from './kvService.js';

export async function getBet(betId) {
  return await kvService.getBet(betId);
}

export async function setBet(betId, bet) {
  return await kvService.setBet(betId, bet);
}

export async function getUserBets(userId) {
  const betslipIds = await kvService.getBetSlipHistory(userId, 100);
  if (!betslipIds || betslipIds.length === 0) return [];
  const bets = await Promise.all(
    betslipIds.map(async (betId) => {
      const bet = await kvService.getBet(betId);
      return bet ? { ...bet, id: betId } : null;
    })
  );
  return bets.filter(Boolean);
}
