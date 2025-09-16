// Fetch all bets for a user
export function useBets(userId) {
  return useApi(`/bets/${userId}`);
}

// Set all bets for a user
export function useSetBets() {
  return useCallback(async (userId, bets) => {
    const res = await fetch(`${API_BASE}/bets/${userId}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bets)
      }
    );
    return res.ok;
  }, []);
}
import { useState, useEffect, useCallback } from 'react';

const API_BASE = '/api';

// Generic fetch hook
function useApi(endpoint, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetch(API_BASE + endpoint, options)
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(json => { if (isMounted) setData(json); })
      .catch(err => { if (isMounted) setError(err); })
      .finally(() => { if (isMounted) setLoading(false); });
    return () => { isMounted = false; };
  }, [endpoint, options]);

  return { data, loading, error };
}

// User
export function useUser(userId) {
  return useApi(`/user/${userId}`);
}
export function useSetUser() {
  return useCallback(async (userId, profile) => {
    const res = await fetch(`${API_BASE}/user/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile)
    });
    return res.ok;
  }, []);
}

// BetSlip
export function useActiveBetSlip(userId) {
  return useApi(`/betslip/${userId}/active`);
}
export function useSetActiveBetSlip() {
  return useCallback(async (userId, betSlip) => {
    const res = await fetch(`${API_BASE}/betslip/${userId}/active`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(betSlip)
    });
    return res.ok;
  }, []);
}
export function useBetSlipHistory(userId, count = 10) {
  return useApi(`/betslip/${userId}/history?count=${count}`);
}
export function useAddBetSlipToHistory() {
  return useCallback(async (userId, betslipId) => {
    const res = await fetch(`${API_BASE}/betslip/${userId}/history`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ betslipId })
    });
    return res.ok;
  }, []);
}

// Bet
export function useBet(betId) {
  return useApi(`/bet/${betId}`);
}
export function useSetBet() {
  return useCallback(async (betId, bet) => {
    const res = await fetch(`${API_BASE}/bet/${betId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bet)
    });
    return res.ok;
  }, []);
}

// Game
export function useGame(gameId) {
  return useApi(`/game/${gameId}`);
}
export function useSetGame() {
  return useCallback(async (gameId, game) => {
    const res = await fetch(`${API_BASE}/game/${gameId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(game)
    });
    return res.ok;
  }, []);
}

// Leaderboard
export function useLeaderboard(type, count = 10) {
  return useApi(`/leaderboard/${type}?count=${count}`);
}
export function useUpdateLeaderboard() {
  return useCallback(async (type, userId, score) => {
    const res = await fetch(`${API_BASE}/leaderboard/${type}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, score })
    });
    return res.ok;
  }, []);
}
