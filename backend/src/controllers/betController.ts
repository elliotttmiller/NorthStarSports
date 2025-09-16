import { Request, Response, NextFunction } from 'express';
import * as betService from '../services/betService';
import { success, error } from '../utils/responseFormatter';

export async function getBet(req: Request, res: Response, next: NextFunction) {
  try {
    const bet = await betService.getBet(req.params.betId);
    if (!bet) return res.status(404).json(error('Bet not found', 404));
    res.json(success(bet));
  } catch (err) {
    next(err);
  }
}

export async function setBet(req: Request, res: Response, next: NextFunction) {
  try {
    await betService.setBet(req.params.betId, req.body);
    res.json(success({ betId: req.params.betId }));
  } catch (err) {
    next(err);
  }
}

export async function getUserBets(req: Request, res: Response, next: NextFunction) {
  try {
    const bets = await betService.getUserBets(req.params.userId);
    res.json(success(bets));
  } catch (err) {
    next(err);
  }
}
