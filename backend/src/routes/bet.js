import express from 'express';
import { getBet, setBet, getUserBets } from '../controllers/betController.js';

const router = express.Router();

router.get('/:betId', getBet);
router.post('/:betId', setBet);
router.get('/user/:userId', getUserBets);

export default router;
