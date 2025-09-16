import { Request, Response, NextFunction } from 'express';
import { kvService } from '../services/kvService.js';
import { success, error } from '../utils/responseFormatter.js';
const logger = require('../utils/logger');

export async function getRedis(req: Request, res: Response, next: NextFunction) {
  logger.info({ msg: 'getRedis called', key: req.params.key });
  try {
    const value = await kvService.get(req.params.key);
    if (value === null || typeof value === 'undefined') {
      logger.warn({ msg: 'Redis key not found', key: req.params.key });
      return res.status(404).json(error('Not Found', 404));
    }
    logger.info({ msg: 'getRedis success', key: req.params.key, value });
    res.json(success({ key: req.params.key, value }));
  } catch (err) {
    logger.error({ msg: 'getRedis error', error: err });
    next(err);
  }
}

export async function setRedis(req: Request, res: Response, next: NextFunction) {
  logger.info({ msg: 'setRedis called', key: req.params.key });
  try {
    const { value } = req.body;
    if (typeof value === 'undefined') {
      logger.warn({ msg: 'Missing value in body', key: req.params.key });
      return res.status(400).json(error('Missing value in body', 400));
    }
    await kvService.set(req.params.key, value);
    logger.info({ msg: 'setRedis success', key: req.params.key, value });
    res.json(success({ key: req.params.key, value }));
  } catch (err) {
    logger.error({ msg: 'setRedis error', error: err });
    next(err);
  }
}
