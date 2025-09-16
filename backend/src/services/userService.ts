import { kvService, connectRedis } from './kvService.js';
import { logInfo } from '../utils/logger.js';

// Initialize Redis connection
connectRedis().catch(console.error);

export async function getUser(userId: string): Promise<Record<string, any> | null> {
  logInfo('userService.getUser called', { userId });
  return await kvService.getUser(userId);
}

export async function setUser(userId: string, profile: any): Promise<boolean> {
  logInfo('userService.setUser called', { userId });
  return await kvService.setUser(userId, profile);
}
