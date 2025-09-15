import express from 'express';
import {
  getUser,
  setUser,
  getActiveBetSlip,
  setActiveBetSlip,
  getBetSlipHistory,
  addBetSlipToHistory,
  getBet,
  setBet,
  getGame,
  setGame,
  getLeaderboard,
  updateLeaderboard,
  getUserBets
} from '../controllers/redisController.js';

const router = express.Router();

// Get all bets for a user
router.get('/bets/:userId', getUserBets);

// User
router.get('/user/:userId', getUser);
router.post('/user/:userId', setUser);

// BetSlip
router.get('/betslip/:userId/active', getActiveBetSlip);
router.post('/betslip/:userId/active', setActiveBetSlip);
router.get('/betslip/:userId/history', getBetSlipHistory);
router.post('/betslip/:userId/history', addBetSlipToHistory);

// Bet
router.get('/bet/:betId', getBet);
router.post('/bet/:betId', setBet);

// Game
router.get('/game/:gameId', getGame);
router.post('/game/:gameId', setGame);

// Leaderboard
router.get('/leaderboard/:type', getLeaderboard);
router.post('/leaderboard/:type', updateLeaderboard);

export default router;
