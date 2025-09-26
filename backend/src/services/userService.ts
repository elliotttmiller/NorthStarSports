import prisma from '../lib/prisma';

export async function getUser(userId: string) {
  console.info("userService.getUser called", { userId });
  return await prisma.user.findUnique({ where: { id: userId } });
}

export async function setUser(userId: string, profile: Record<string, string | number | boolean | object | null>) {
  console.info("userService.setUser called", { userId });
  return await prisma.user.update({ where: { id: userId }, data: profile });
}
