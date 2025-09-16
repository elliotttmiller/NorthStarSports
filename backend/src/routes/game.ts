import express, { Request, Response, Router } from 'express';
import { getGame, setGame } from '../controllers/gameController';

const router: Router = express.Router();

router.get('/:gameId', getGame);
router.post('/:gameId', setGame);

export default router;
