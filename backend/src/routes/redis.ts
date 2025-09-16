import express, { Request, Response, Router } from 'express';
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
} from '../controllers/redisController';

const router: Router = express.Router();

router.get('/bets/:userId', getUserBets);
router.get('/user/:userId', getUser);
router.post('/user/:userId', setUser);
router.get('/betslip/:userId/active', getActiveBetSlip);
router.post('/betslip/:userId/active', setActiveBetSlip);
router.get('/betslip/:userId/history', getBetSlipHistory);
router.post('/betslip/:userId/history', addBetSlipToHistory);
router.get('/bet/:betId', getBet);
router.post('/bet/:betId', setBet);
router.get('/game/:gameId', getGame);
router.post('/game/:gameId', setGame);
router.get('/leaderboard/:type', getLeaderboard);
router.post('/leaderboard/:type', updateLeaderboard);

export default router;
