import express, { Request, Response, Router } from 'express';
import { getKV, setKV } from '../controllers/kvController';

const router: Router = express.Router();

router.get('/:key', getKV);
router.post('/:key', setKV);

export default router;
