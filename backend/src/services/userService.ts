import { kvService, connectRedis } from "./kvService.js";

connectRedis().catch(console.error);

export async function getUser(userId: string) {
  console.info("userService.getUser called", { userId });
  return await kvService.getUser(userId);
}

export async function setUser(userId: string, profile: Record<string, string | number | boolean | object | null>) {
  console.info("userService.setUser called", { userId });
  return await kvService.setUser(userId, profile);
}
