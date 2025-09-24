// API utility functions for NorthStar Sports app
import axios from "axios";
import { API_BASE_URL } from "./_config";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Example: Fetch games
export async function fetchGames() {
  const response = await apiClient.get("/games");
  return response.data;
}
