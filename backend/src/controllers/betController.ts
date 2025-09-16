import { Request, Response, NextFunction } from 'express';
import * as betService from '../services/betService';
import { success, error } from '../utils/responseFormatter';

const logger = require('../utils/logger');

export async function getBet(req: Request, res: Response, next: NextFunction) {
  logger.info({ msg: 'getBet called', betId: req.params.betId });
  try {
    const bet = await betService.getBet(req.params.betId);
    if (!bet) {
      logger.warn({ msg: 'Bet not found', betId: req.params.betId });
      return res.status(404).json(error('Bet not found', 404));
    }
    logger.info({ msg: 'getBet success', bet });
    res.json(success(bet));
  } catch (err) {
    logger.error({ msg: 'getBet error', error: err });
    next(err);
  }
}

export async function setBet(req: Request, res: Response, next: NextFunction) {
  logger.info({ msg: 'setBet called', betId: req.params.betId });
  try {
    await betService.setBet(req.params.betId, req.body);
    logger.info({ msg: 'setBet success', betId: req.params.betId });
    res.json(success({ betId: req.params.betId }));
  } catch (err) {
    logger.error({ msg: 'setBet error', error: err });
    next(err);
  }
}

export async function getUserBets(req: Request, res: Response, next: NextFunction) {
  logger.info({ msg: 'getUserBets called', userId: req.params.userId });
  try {
    const bets = await betService.getUserBets(req.params.userId);
    logger.info({ msg: 'getUserBets success', count: bets.length });
    res.json(success(bets));
  } catch (err) {
    logger.error({ msg: 'getUserBets error', error: err });
    next(err);
  }
}
