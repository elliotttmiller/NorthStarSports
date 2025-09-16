import { Request, Response, NextFunction } from 'express';
import { getGame, setGame } from '../services/gameService.js';
import { success, error } from '../utils/responseFormatter.js';
const logger = require('../utils/logger');

export async function getGameById(req: Request, res: Response, next: NextFunction) {
  logger.info({ msg: 'getGameById called', id: req.params.id });
  try {
    const game = await getGame(req.params.id);
    if (!game) {
      logger.warn({ msg: 'Game not found', id: req.params.id });
      return res.status(404).json(error('Game not found', 404));
    }
    logger.info({ msg: 'getGameById success', id: req.params.id });
    res.json(success(game));
  } catch (err) {
    logger.error({ msg: 'getGameById error', error: err });
    next(err);
  }
}

export async function setGameById(req: Request, res: Response, next: NextFunction) {
  logger.info({ msg: 'setGameById called', id: req.params.id });
  try {
    const { game } = req.body;
    if (!game) {
      logger.warn({ msg: 'Missing game in body', id: req.params.id });
      return res.status(400).json(error('Missing game in body', 400));
    }
    await setGame(req.params.id, game);
    logger.info({ msg: 'setGameById success', id: req.params.id });
    res.json(success({ id: req.params.id, game }));
  } catch (err) {
    logger.error({ msg: 'setGameById error', error: err });
    next(err);
  }
}
