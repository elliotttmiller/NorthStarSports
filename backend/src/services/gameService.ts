import { kvService } from './kvService';

export async function getGame(gameId: string) {
  return await kvService.getGame(gameId);
}

export async function setGame(gameId: string, game: any) {
  return await kvService.setGame(gameId, game);
}
