import express, { Router } from "express";
import { getGame, setGame } from "../controllers/gameController.js";

const router: Router = express.Router();

router.get("/:gameId", getGame);
router.post("/:gameId", setGame);

export default router;
