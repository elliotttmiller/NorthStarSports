// Simple logger utility (can be replaced with winston later)
export function logInfo(msg) {
  console.log(`[INFO] ${msg}`);
}
export function logError(msg) {
  console.error(`[ERROR] ${msg}`);
}
