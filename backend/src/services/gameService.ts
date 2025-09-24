import { kvService, connectRedis } from "./kvService.js";

// Initialize Redis connection
connectRedis().catch(console.error);

  logInfo("gameService.getGame called", { gameId });
  return await kvService.getGame(gameId);
}

  logInfo("gameService.setGame called", { gameId });
  return await kvService.setGame(gameId, game);
}
