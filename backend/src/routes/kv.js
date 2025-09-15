import express from 'express';
import { getKV, setKV } from '../controllers/kvController.js';

const router = express.Router();

router.get('/:key', getKV);
router.post('/:key', setKV);

export default router;
