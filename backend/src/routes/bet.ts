import express, { Request, Response, Router } from 'express';
import { getBet, setBet, getUserBets } from '../controllers/betController';

const router: Router = express.Router();

router.get('/:betId', getBet);
router.post('/:betId', setBet);
router.get('/user/:userId', getUserBets);

export default router;
