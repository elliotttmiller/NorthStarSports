import { kvService } from './kvService.js';

export async function getGame(gameId) {
  return await kvService.getGame(gameId);
}

export async function setGame(gameId, game) {
  return await kvService.setGame(gameId, game);
}
