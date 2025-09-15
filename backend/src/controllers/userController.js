import * as userService from '../services/userService.js';
import { success, error } from '../utils/responseFormatter.js';

export async function getUser(req, res, next) {
  try {
    const user = await userService.getUser(req.params.userId);
    if (!user) return res.status(404).json(error('User not found', 404));
    res.json(success(user));
  } catch (err) {
    next(err);
  }
}

export async function setUser(req, res, next) {
  try {
    await userService.setUser(req.params.userId, req.body);
    res.json(success({ userId: req.params.userId }));
  } catch (err) {
    next(err);
  }
}
