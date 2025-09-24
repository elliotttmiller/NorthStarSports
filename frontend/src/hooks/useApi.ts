import { useState, useEffect, useCallback } from "react";
import { debounce } from "@/utils/debounce";
import { Bet, BetSlip } from "@/types";

const API_BASE = "/api/v1";

// Type definitions
export interface Profile {
  id: string;
  name: string;
  // Add more fields as needed
}
export interface Game {
  id: string;
  name: string;
  // Add more fields as needed
}

// Generic fetch hook
interface UseApiOptions extends RequestInit {
  debounceMs?: number;
}

function useApi<T = unknown>(endpoint: string, options: UseApiOptions = {}) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Optionally debounce API calls for endpoints prone to rapid requests
  const debounceMs = options.debounceMs || 0;

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Always add ngrok-skip-browser-warning header
      const mergedOptions = {
        ...options,
        headers: {
          ...(options.headers || {}),
          "ngrok-skip-browser-warning": "true",
        },
      };
      const res = await fetch(API_BASE + endpoint, mergedOptions);
      if (res.ok) {
        const json = await res.json();
        setData(json.success ? json.data : json);
      } else {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [endpoint, options]);

  // Debounced version of fetchData
  const debouncedFetchData = debounceMs > 0
    ? debounce(fetchData, debounceMs)
    : fetchData;

  useEffect(() => {
    debouncedFetchData();
  }, [debouncedFetchData]);

  // Return refetch function along with data, loading, error
  return { data, loading, error, refetch: debouncedFetchData };
}

// Fetch all bets for a user
export function useBets(userId: string) {
  return useApi<Bet[]>(`/redis/bets/${userId}`);
}

// Set all bets for a user
export function useSetBets() {
  return useCallback(async (userId: string, bets: Bet[]) => {
    const res = await fetch(`${API_BASE}/redis/bets/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bets),
    });
    return res.ok;
  }, []);
}

// User
export function useUser(userId: string) {
  return useApi<Profile>(`/redis/user/${userId}`);
}
export function useSetUser() {
  return useCallback(async (userId: string, profile: Profile) => {
    const res = await fetch(`${API_BASE}/redis/user/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    return res.ok;
  }, []);
}

// BetSlip
export function useActiveBetSlip(userId: string) {
  return useApi<BetSlip>(`/redis/betslip/${userId}/active`);
}
export function useSetActiveBetSlip() {
  return useCallback(async (userId: string, betSlip: BetSlip) => {
    const res = await fetch(`${API_BASE}/redis/betslip/${userId}/active`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(betSlip),
    });
    return res.ok;
  }, []);
}
export function useBetSlipHistory(userId: string, count = 10) {
  return useApi<BetSlip[]>(`/redis/betslip/${userId}/history?count=${count}`);
}
export function useAddBetSlipToHistory() {
  return useCallback(async (userId: string, betslipId: string) => {
    const res = await fetch(`${API_BASE}/redis/betslip/${userId}/history`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ betslipId }),
    });
    return res.ok;
  }, []);
}

// Bet
export function useBet(betId: string) {
  return useApi<Bet>(`/redis/bet/${betId}`);
}
export function useSetBet() {
  return useCallback(async (betId: string, bet: Bet) => {
    const res = await fetch(`${API_BASE}/redis/bet/${betId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bet),
    });
    return res.ok;
  }, []);
}

// Game
export function useGame(gameId: string) {
  return useApi<Game>(`/redis/game/${gameId}`);
}
export function useSetGame() {
  return useCallback(async (gameId: string, game: Game) => {
    const res = await fetch(`${API_BASE}/redis/game/${gameId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(game),
    });
    return res.ok;
  }, []);
}

// Leaderboard
export function useLeaderboard(type: string, count = 10) {
  return useApi(`/leaderboard/${type}?count=${count}`);
}
export function useUpdateLeaderboard() {
  return useCallback(async (type: string, userId: string, score: number) => {
    const res = await fetch(`${API_BASE}/leaderboard/${type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, score }),
    });
    return res.ok;
  }, []);
}
