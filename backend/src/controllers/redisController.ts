import { Request, Response, NextFunction } from "express";
import { kvService } from "../services/kvService.js";
import { success, error } from "../utils/responseFormatter.js";

// User operations
export async function getUser(
  req: Request,
  res: Response,
): Promise<void> {
  const userId = req.params.userId;
  if (!userId) {
    logWarn("Missing userId parameter");
    res.status(400).json(error("Missing userId parameter", 400));
    return;
  }

  logInfo("Redis getUser called", { userId });
  try {
    const user = await kvService.get(`user:${userId}`);
    if (!user) {
      logWarn("User not found in Redis", { userId });
      res.status(404).json(error("User not found", 404));
      return;
    }
    logInfo("Redis getUser success", { userId });
    res.json(success(user));
  } catch (err) {
  }
}

export async function setUser(
  req: Request,
  res: Response,
): Promise<void> {
  const userId = req.params.userId;
  if (!userId) {
    logWarn("Missing userId parameter");
    res.status(400).json(error("Missing userId parameter", 400));
    return;
  }

  logInfo("Redis setUser called", { userId });
  try {
    const userData = req.body;
    await kvService.set(`user:${userId}`, userData);
    logInfo("Redis setUser success", { userId });
    res.json(success({ userId, user: userData }));
  } catch (err) {
  }
}

// BetSlip operations
export async function getActiveBetSlip(
  req: Request,
  res: Response,
): Promise<void> {
  const userId = req.params.userId;
  if (!userId) {
    logWarn("Missing userId parameter");
    res.status(400).json(error("Missing userId parameter", 400));
    return;
  }

  logInfo("Redis getActiveBetSlip called", { userId });
  try {
    const betSlip = await kvService.get(`betslip:${userId}:active`);
    if (!betSlip) {
      logWarn("Active bet slip not found", { userId });
      res.status(404).json(error("Active bet slip not found", 404));
      return;
    }
    logInfo("Redis getActiveBetSlip success", { userId });
    res.json(success(betSlip));
  } catch (err) {
  }
}

export async function setActiveBetSlip(
  req: Request,
  res: Response,
): Promise<void> {
  const userId = req.params.userId;
  if (!userId) {
    logWarn("Missing userId parameter");
    res.status(400).json(error("Missing userId parameter", 400));
    return;
  }

  logInfo("Redis setActiveBetSlip called", { userId });
  try {
    const betSlipData = req.body;
    await kvService.set(`betslip:${userId}:active`, betSlipData);
    logInfo("Redis setActiveBetSlip success", { userId });
    res.json(success({ userId, betSlip: betSlipData }));
  } catch (err) {
  }
}

export async function getBetSlipHistory(
  req: Request,
  res: Response,
): Promise<void> {
  const userId = req.params.userId;
  if (!userId) {
    logWarn("Missing userId parameter");
    res.status(400).json(error("Missing userId parameter", 400));
    return;
  }

  logInfo("Redis getBetSlipHistory called", { userId });
  try {
    const count = Number(req.query.count) || 10;
    const history = await kvService.getBetSlipHistory(userId, count);
    if (!history) {
      logWarn("Bet slip history not found", { userId });
      res.json(success([])); // Return empty array if no history
      return;
    }
    logInfo("Redis getBetSlipHistory success", { userId });
    res.json(success(history));
  } catch (err) {
  }
}

export async function addBetSlipToHistory(
  req: Request,
  res: Response,
): Promise<void> {
  const userId = req.params.userId;
  if (!userId) {
    logWarn("Missing userId parameter");
    res.status(400).json(error("Missing userId parameter", 400));
    return;
  }

  logInfo("Redis addBetSlipToHistory called", { userId });
  try {
    const betSlipId = req.body.betSlipId;
    if (!betSlipId) {
      logWarn("Missing betSlipId in body", { userId });
      res.status(400).json(error("Missing betSlipId in body", 400));
      return;
    }

    const currentHistory =
      (await kvService.get(`betslip:${userId}:history`)) || [];
    const updatedHistory = Array.isArray(currentHistory)
      ? [...currentHistory, betSlipId]
      : [betSlipId];
    await kvService.set(`betslip:${userId}:history`, updatedHistory);

    logInfo("Redis addBetSlipToHistory success", { userId });
    res.json(success({ userId, betSlipId, history: updatedHistory }));
  } catch (err) {
  }
}

// Bet operations
export async function getBet(
  req: Request,
  res: Response,
): Promise<void> {
  const betId = req.params.betId;
  if (!betId) {
    logWarn("Missing betId parameter");
    res.status(400).json(error("Missing betId parameter", 400));
    return;
  }

  logInfo("Redis getBet called", { betId });
  try {
    const bet = await kvService.get(`bet:${betId}`);
    if (!bet) {
      logWarn("Bet not found in Redis", { betId });
      res.status(404).json(error("Bet not found", 404));
      return;
    }
    logInfo("Redis getBet success", { betId });
    res.json(success(bet));
  } catch (err) {
  }
}

export async function setBet(
  req: Request,
  res: Response,
): Promise<void> {
  const betId = req.params.betId;
  if (!betId) {
    logWarn("Missing betId parameter");
    res.status(400).json(error("Missing betId parameter", 400));
    return;
  }

  logInfo("Redis setBet called", { betId });
  try {
    const betData = req.body;
    await kvService.set(`bet:${betId}`, betData);
    logInfo("Redis setBet success", { betId });
    res.json(success({ betId, bet: betData }));
  } catch (err) {
  }
}

// Game operations
export async function getGame(
  req: Request,
  res: Response,
): Promise<void> {
  const gameId = req.params.gameId;
  if (!gameId) {
    logWarn("Missing gameId parameter");
    res.status(400).json(error("Missing gameId parameter", 400));
    return;
  }

  logInfo("Redis getGame called", { gameId });
  try {
    const game = await kvService.get(`game:${gameId}`);
    if (!game) {
      logWarn("Game not found in Redis", { gameId });
      res.status(404).json(error("Game not found", 404));
      return;
    }
    logInfo("Redis getGame success", { gameId });
    res.json(success(game));
  } catch (err) {
  }
}

export async function setGame(
  req: Request,
  res: Response,
): Promise<void> {
  const gameId = req.params.gameId;
  if (!gameId) {
    logWarn("Missing gameId parameter");
    res.status(400).json(error("Missing gameId parameter", 400));
    return;
  }

  logInfo("Redis setGame called", { gameId });
  try {
    const gameData = req.body;
    await kvService.set(`game:${gameId}`, gameData);
    logInfo("Redis setGame success", { gameId });
    res.json(success({ gameId, game: gameData }));
  } catch (err) {
  }
}

// User bets operation
export async function getUserBets(
  req: Request,
  res: Response,
): Promise<void> {
  const userId = req.params.userId;
  if (!userId) {
    logWarn("Missing userId parameter");
    res.status(400).json(error("Missing userId parameter", 400));
    return;
  }

  logInfo("Redis getUserBets called", { userId });
  try {
    const bets = (await kvService.get(`bets:${userId}`)) || [];
    logInfo("Redis getUserBets success", {
      userId,
      count: Array.isArray(bets) ? bets.length : 0,
    });
    res.json(success(Array.isArray(bets) ? bets : []));
  } catch (err) {
  }
}

export async function setUserBets(
  req: Request,
  res: Response,
): Promise<void> {
  const userId = req.params.userId;
  if (!userId) {
    logWarn("Missing userId parameter");
    res.status(400).json(error("Missing userId parameter", 400));
    return;
  }

  logInfo("Redis setUserBets called", { userId });
  try {
    const bets = req.body;
    await kvService.set(`bets:${userId}`, bets);
    logInfo("Redis setUserBets success", {
      userId,
      count: Array.isArray(bets) ? bets.length : 0,
    });
    res.json(success({ userId, bets }));
  } catch (err) {
  }
}
