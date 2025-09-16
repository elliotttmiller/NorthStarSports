export function success<T>(data: T): { success: true; data: T } {
  return { success: true, data };
}
export function error(message: string, code: number = 400): { success: false; error: { message: string; code: number } } {
  return { success: false, error: { message, code } };
}
