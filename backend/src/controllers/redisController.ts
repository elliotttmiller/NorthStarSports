import { Request, Response } from 'express';
import { kvService } from '../services/kvService';

export const getUserBets = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const betslipIds = await kvService.getBetSlipHistory(userId, 100);
  if (!betslipIds || betslipIds.length === 0) return res.json([]);
  const bets = await Promise.all(
    betslipIds.map(async (betId: string) => {
      const bet = await kvService.getBet(betId);
      return bet ? { ...bet, id: betId } : null;
    })
  );
  res.json(bets.filter(Boolean));
};

export const getUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await kvService.getUser(userId);
  if (!user || Object.keys(user).length === 0) return res.status(404).json({ error: 'Not Found' });
  res.json(user);
};
export const setUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  await kvService.setUser(userId, req.body);
  res.json({ success: true });
};

export const getActiveBetSlip = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const slip = await kvService.getActiveBetSlip(userId);
  if (!slip) return res.status(404).json({ error: 'Not Found' });
  res.json(slip);
};
export const setActiveBetSlip = async (req: Request, res: Response) => {
  const { userId } = req.params;
  await kvService.setActiveBetSlip(userId, req.body);
  res.json({ success: true });
};
export const getBetSlipHistory = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const count = req.query.count ? parseInt(req.query.count as string, 10) : 10;
  const history = await kvService.getBetSlipHistory(userId, count);
  res.json(history);
};
export const addBetSlipToHistory = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { betslipId } = req.body;
  await kvService.addBetSlipToHistory(userId, betslipId);
  res.json({ success: true });
};

export const getBet = async (req: Request, res: Response) => {
  const { betId } = req.params;
  const bet = await kvService.getBet(betId);
  if (!bet) return res.status(404).json({ error: 'Not Found' });
  res.json(bet);
};
export const setBet = async (req: Request, res: Response) => {
  const { betId } = req.params;
  await kvService.setBet(betId, req.body);
  res.json({ success: true });
};

export const getGame = async (req: Request, res: Response) => {
  const { gameId } = req.params;
  const game = await kvService.getGame(gameId);
  if (!game) return res.status(404).json({ error: 'Not Found' });
  res.json(game);
};
export const setGame = async (req: Request, res: Response) => {
  const { gameId } = req.params;
  await kvService.setGame(gameId, req.body);
  res.json({ success: true });
};

export const getLeaderboard = async (req: Request, res: Response) => {
  const { type } = req.params;
  const count = req.query.count ? parseInt(req.query.count as string, 10) : 10;
  const board = await kvService.getLeaderboard(type, count);
  res.json(board);
};
export const updateLeaderboard = async (req: Request, res: Response) => {
  const { type } = req.params;
  const { userId, score } = req.body;
  await kvService.updateLeaderboard(type, userId, score);
  res.json({ success: true });
};
