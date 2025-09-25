import { logInfo, logWarn } from "../utils/logger";
import { Request, Response } from "express";
import * as betService from "../services/betService.js";
import { success, error } from "../utils/responseFormatter.js";

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

  logInfo("getBet called", { betId });
  try {
    const bet = await betService.getBet(betId);
    if (!bet) {
      logWarn("Bet not found", { betId });
      res.status(404).json(error("Bet not found", 404));
      return;
    }
    logInfo("getBet success", { bet });
    res.json(success(bet));
  } catch {
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

  logInfo("setBet called", { betId });
  try {
    await betService.setBet(betId, req.body);
    logInfo("setBet success", { betId });
    res.json(success({ betId }));
  } catch {
  }
}

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

  logInfo("getUserBets called", { userId });
  try {
    const bets = await betService.getUserBets(userId);
    logInfo("getUserBets success", { count: bets.length });
    res.json(success(bets));
  } catch {
  }
}
