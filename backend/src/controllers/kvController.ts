import { Request, Response, NextFunction } from 'express';
import { kvService } from '../services/kvService.js';
import { success, error } from '../utils/responseFormatter.js';
import { logInfo, logError, logWarn } from '../utils/logger.js';

export async function getKV(req: Request, res: Response, next: NextFunction): Promise<void> {
  const key = req.params.key;
  if (!key) {
    logWarn('Missing key parameter');
    res.status(400).json(error('Missing key parameter', 400));
    return;
  }
  
  logInfo('getKV called', { key });
  try {
    const value = await kvService.get(key);
    if (value === null || typeof value === 'undefined') {
      logWarn('KV not found', { key });
      res.status(404).json(error('Not Found', 404));
      return;
    }
    logInfo('getKV success', { key, value });
    res.json(success({ key, value }));
  } catch (err) {
    logError('getKV error', err as Error);
    next(err);
  }
}

export async function setKV(req: Request, res: Response, next: NextFunction): Promise<void> {
  const key = req.params.key;
  if (!key) {
    logWarn('Missing key parameter');
    res.status(400).json(error('Missing key parameter', 400));
    return;
  }
  
  logInfo('setKV called', { key });
  try {
    const { value } = req.body;
    if (typeof value === 'undefined') {
      logWarn('Missing value in body', { key });
      res.status(400).json(error('Missing value in body', 400));
      return;
    }
    await kvService.set(key, value);
    logInfo('setKV success', { key, value });
    res.json(success({ key, value }));
  } catch (err) {
    logError('setKV error', err as Error);
    next(err);
  }
}
