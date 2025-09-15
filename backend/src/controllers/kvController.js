import * as kvService from '../services/kvService.js';
import { success, error } from '../utils/responseFormatter.js';

export async function getKV(req, res, next) {
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

export async function setKV(req, res, next) {
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
