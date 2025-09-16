import { kvService } from './kvService';

export async function getUser(userId: string) {
  return await kvService.getUser(userId);
}

export async function setUser(userId: string, profile: any) {
  return await kvService.setUser(userId, profile);
}
