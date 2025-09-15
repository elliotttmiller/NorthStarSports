import * as betService from '../services/betService.js';
import { success, error } from '../utils/responseFormatter.js';

export async function getBet(req, res, next) {
  try {
    const bet = await betService.getBet(req.params.betId);
    if (!bet) return res.status(404).json(error('Bet not found', 404));
    res.json(success(bet));
  } catch (err) {
    next(err);
  }
}

export async function setBet(req, res, next) {
  try {
    await betService.setBet(req.params.betId, req.body);
    res.json(success({ betId: req.params.betId }));
  } catch (err) {
    next(err);
  }
}

export async function getUserBets(req, res, next) {
  try {
    const bets = await betService.getUserBets(req.params.userId);
    res.json(success(bets));
  } catch (err) {
    next(err);
  }
}
