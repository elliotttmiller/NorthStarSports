import { kvService } from './kvService.js';

export async function getUser(userId) {
  return await kvService.getUser(userId);
}

export async function setUser(userId, profile) {
  return await kvService.setUser(userId, profile);
}
