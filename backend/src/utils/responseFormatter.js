// Standard API response formatter
export function success(data) {
  return { success: true, data };
}
export function error(message, code = 400) {
  return { success: false, error: { message, code } };
}
