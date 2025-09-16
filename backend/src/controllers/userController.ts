import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService';
import { success, error } from '../utils/responseFormatter';

const logger = require('../utils/logger');

export async function getUser(req: Request, res: Response, next: NextFunction) {
  logger.info({ msg: 'getUser called', userId: req.params.userId });
  try {
    const user = await userService.getUser(req.params.userId);
    if (!user) {
      logger.warn({ msg: 'User not found', userId: req.params.userId });
      return res.status(404).json(error('User not found', 404));
    }
    logger.info({ msg: 'getUser success', user });
    res.json(success(user));
  } catch (err) {
    logger.error({ msg: 'getUser error', error: err });
    next(err);
  }
}

export async function setUser(req: Request, res: Response, next: NextFunction) {
  logger.info({ msg: 'setUser called', userId: req.params.userId });
  try {
    await userService.setUser(req.params.userId, req.body);
    logger.info({ msg: 'setUser success', userId: req.params.userId });
    res.json(success({ userId: req.params.userId }));
  } catch (err) {
    logger.error({ msg: 'setUser error', error: err });
    next(err);
  }
}
