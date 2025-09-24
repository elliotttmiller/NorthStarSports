// Centralized configuration for NorthStar Sports backend
export const APP_NAME = "NorthStar Sports";
export const API_BASE_URL = process.env.API_BASE_URL || "https://api.northstarsports.com";
export const FEATURE_FLAGS = {
  enableLiveBetting: true,
  enableDarkMode: true,
};
