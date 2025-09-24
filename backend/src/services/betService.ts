import { kvService, connectRedis } from "./kvService.js";

// Initialize Redis connection
connectRedis().catch(console.error);

  logInfo("betService.getBet called", { betId });
  return await kvService.getBet(betId);
}

  logInfo("betService.setBet called", { betId });
  return await kvService.setBet(betId, bet);
}

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
