import { kvService, connectRedis } from "./kvService.js";

// Initialize Redis connection
connectRedis().catch(console.error);

export async function getUser(
  userId: string,
  logInfo("userService.getUser called", { userId });
  return await kvService.getUser(userId);
}

  logInfo("userService.setUser called", { userId });
  return await kvService.setUser(userId, profile);
}
