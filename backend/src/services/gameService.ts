import prisma from '../lib/prisma';

export async function getGame(gameId: string) {
  console.info("gameService.getGame called", { gameId });
  return await prisma.game.findUnique({ where: { id: gameId } });
}

export async function setGame(gameId: string, game: Record<string, unknown>) {
  console.info("gameService.setGame called", { gameId });
  return await prisma.game.update({ where: { id: gameId }, data: game });
}
