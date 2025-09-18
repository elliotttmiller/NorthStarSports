import express, { Router } from "express";
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
  getUserBets,
  setUserBets,
} from "../controllers/redisController.js";

const router: Router = express.Router();

router.get("/bets/:userId", getUserBets);
router.post("/bets/:userId", setUserBets);
router.get("/user/:userId", getUser);
router.post("/user/:userId", setUser);
router.get("/betslip/:userId/active", getActiveBetSlip);
router.post("/betslip/:userId/active", setActiveBetSlip);
router.get("/betslip/:userId/history", getBetSlipHistory);
router.post("/betslip/:userId/history", addBetSlipToHistory);
router.get("/bet/:betId", getBet);
router.post("/bet/:betId", setBet);
router.get("/game/:gameId", getGame);
router.post("/game/:gameId", setGame);

export default router;
