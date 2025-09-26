import prisma from '../lib/prisma';

// ...existing code...

export async function getBet(betId: string) {
  console.info("betService.getBet called", { betId });
  return await prisma.bet.findUnique({ where: { id: betId } });
}

export async function setBet(betId: string, bet: Record<string, unknown>) {
  console.info("betService.setBet called", { betId });
  return await prisma.bet.update({ where: { id: betId }, data: bet });
}

export async function getUserBets(userId: string) {
  console.info("betService.getUserBets called", { userId });
  const bets = await prisma.bet.findMany({ where: { userId } });
  console.info("betService.getUserBets success", {
    userId,
    count: bets.length,
  });
  return bets;
}
