import { kvService } from '../services/kvService.js';

// User
export const getUser = async (req, res) => {
  const { userId } = req.params;
  const user = await kvService.getUser(userId);
  if (!user || Object.keys(user).length === 0) return res.status(404).json({ error: 'Not Found' });
  res.json(user);
};
export const setUser = async (req, res) => {
  const { userId } = req.params;
  await kvService.setUser(userId, req.body);
  res.json({ success: true });
};

// BetSlip
export const getActiveBetSlip = async (req, res) => {
  const { userId } = req.params;
  const slip = await kvService.getActiveBetSlip(userId);
  if (!slip) return res.status(404).json({ error: 'Not Found' });
  res.json(slip);
};
export const setActiveBetSlip = async (req, res) => {
  const { userId } = req.params;
  await kvService.setActiveBetSlip(userId, req.body);
  res.json({ success: true });
};
export const getBetSlipHistory = async (req, res) => {
  const { userId } = req.params;
  const count = req.query.count ? parseInt(req.query.count, 10) : 10;
  const history = await kvService.getBetSlipHistory(userId, count);
  res.json(history);
};
export const addBetSlipToHistory = async (req, res) => {
  const { userId } = req.params;
  const { betslipId } = req.body;
  await kvService.addBetSlipToHistory(userId, betslipId);
  res.json({ success: true });
};

// Bet
export const getBet = async (req, res) => {
  const { betId } = req.params;
  const bet = await kvService.getBet(betId);
  if (!bet) return res.status(404).json({ error: 'Not Found' });
  res.json(bet);
};
export const setBet = async (req, res) => {
  const { betId } = req.params;
  await kvService.setBet(betId, req.body);
  res.json({ success: true });
};

// Game
export const getGame = async (req, res) => {
  const { gameId } = req.params;
  const game = await kvService.getGame(gameId);
  if (!game) return res.status(404).json({ error: 'Not Found' });
  res.json(game);
};
export const setGame = async (req, res) => {
  const { gameId } = req.params;
  await kvService.setGame(gameId, req.body);
  res.json({ success: true });
};

// Leaderboard
export const getLeaderboard = async (req, res) => {
  const { type } = req.params;
  const count = req.query.count ? parseInt(req.query.count, 10) : 10;
  const board = await kvService.getLeaderboard(type, count);
  res.json(board);
};
export const updateLeaderboard = async (req, res) => {
  const { type } = req.params;
  const { userId, score } = req.body;
  await kvService.updateLeaderboard(type, userId, score);
  res.json({ success: true });
};
