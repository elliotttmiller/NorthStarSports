import { kvService, connectRedis } from './kvService.js';
import { logInfo } from '../utils/logger.js';

// Initialize Redis connection
connectRedis().catch(console.error);

export async function getGame(gameId: string): Promise<any> {
  logInfo('gameService.getGame called', { gameId });
  return await kvService.getGame(gameId);
}

export async function setGame(gameId: string, game: any): Promise<boolean> {
  logInfo('gameService.setGame called', { gameId });
  return await kvService.setGame(gameId, game);
}
