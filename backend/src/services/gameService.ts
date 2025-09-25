import { kvService, connectRedis } from "./kvService.js";

connectRedis().catch(console.error);

export async function getGame(gameId: string) {
  console.info("gameService.getGame called", { gameId });
  return await kvService.getGame(gameId);
}

export async function setGame(gameId: string, game: Record<string, unknown>) {
  console.info("gameService.setGame called", { gameId });
  return await kvService.setGame(gameId, game);
}
