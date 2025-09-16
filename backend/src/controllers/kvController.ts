import { Request, Response, NextFunction } from 'express';
import { kvService } from '../services/kvService';
import { success, error } from '../utils/responseFormatter';

export async function getKV(req: Request, res: Response, next: NextFunction) {
  try {
  const value = await kvService.get(req.params.key);
    if (value === null || typeof value === 'undefined') {
      return res.status(404).json(error('Not Found', 404));
    }
    res.json(success({ key: req.params.key, value }));
  } catch (err) {
    next(err);
  }
}

export async function setKV(req: Request, res: Response, next: NextFunction) {
  try {
    const { value } = req.body;
    if (typeof value === 'undefined') {
      return res.status(400).json(error('Missing value in body', 400));
    }
  await kvService.set(req.params.key, value);
    res.json(success({ key: req.params.key, value }));
  } catch (err) {
    next(err);
  }
}
