import { logInfo, logWarn } from "../utils/logger";
import { Request, Response } from "express";
import {
  getGame as getGameService,
  setGame as setGameService,
} from "../services/gameService.js";
import { success, error } from "../utils/responseFormatter.js";
import { GameSchema } from "../../../shared/types/zodSchemas";

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

  logInfo("getGame called", { gameId });
  try {
    const game = await getGameService(gameId);
    if (!game) {
      logWarn("Game not found", { gameId });
      res.status(404).json(error("Game not found", 404));
      return;
    }
    // Zod validation
    const parsed = GameSchema.safeParse(game);
    if (!parsed.success) {
      logWarn("Game data validation failed", { errors: parsed.error.errors });
      res.status(500).json(error("Game data validation failed", 500));
      return;
    }
    logInfo("getGame success", { gameId });
    res.json(success(parsed.data));
  } catch {
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

  logInfo("setGame called", { gameId });
  try {
    // Accept game data directly in body or nested under 'game' field
    const gameData = req.body.game || req.body;
    if (!gameData || Object.keys(gameData).length === 0) {
      logWarn("Missing game data in body", { gameId });
      res.status(400).json(error("Missing game data in body", 400));
      return;
    }
    await setGameService(gameId, gameData);
    logInfo("setGame success", { gameId });
    res.json(success({ gameId, game: gameData }));
  } catch {
  }
}
