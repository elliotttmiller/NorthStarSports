// Centralized configuration for NorthStar Sports app
// Add environment variables, feature flags, and global settings here

export const APP_NAME = "NorthStar Sports";
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.northstarsports.com";
export const FEATURE_FLAGS = {
  enableLiveBetting: true,
  enableDarkMode: true,
};
