import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService';
import { success, error } from '../utils/responseFormatter';

export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await userService.getUser(req.params.userId);
    if (!user) return res.status(404).json(error('User not found', 404));
    res.json(success(user));
  } catch (err) {
    next(err);
  }
}

export async function setUser(req: Request, res: Response, next: NextFunction) {
  try {
    await userService.setUser(req.params.userId, req.body);
    res.json(success({ userId: req.params.userId }));
  } catch (err) {
    next(err);
  }
}
