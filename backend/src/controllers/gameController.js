import * as gameService from '../services/gameService.js';
import { success, error } from '../utils/responseFormatter.js';

export async function getGame(req, res, next) {
  try {
    const game = await gameService.getGame(req.params.gameId);
    if (!game) return res.status(404).json(error('Game not found', 404));
    res.json(success(game));
  } catch (err) {
    next(err);
  }
}

export async function setGame(req, res, next) {
  try {
    await gameService.setGame(req.params.gameId, req.body);
    res.json(success({ gameId: req.params.gameId }));
  } catch (err) {
    next(err);
  }
}
