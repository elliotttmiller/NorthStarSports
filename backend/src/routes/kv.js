import express from 'express';
import { getKV, setKV } from '../controllers/kvController.js';

const router = express.Router();

// GET /kv/:key
router.get('/:key', getKV);
// POST /kv/:key
router.post('/:key', setKV);

export default router;
