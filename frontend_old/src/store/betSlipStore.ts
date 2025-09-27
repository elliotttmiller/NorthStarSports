import { create } from 'zustand';
import type { Bet, BetSlip } from '@/types';

export interface BetSlipState extends BetSlip {
  addBet: (bet: Bet) => void;
  removeBet: (betId: string) => void;
  updateStake: (betId: string, stake: number) => void;
  setBetType: (type: 'single' | 'parlay') => void;
  clearBetSlip: () => void;
}

const initialState: BetSlip = {
  bets: [],
  betType: 'single',
  totalStake: 0,
  totalPayout: 0,
  totalOdds: 0,
};

const calculateParlayOdds = (oddsArray: number[]): number => {
  if (oddsArray.length === 0) return 0;
  let decimal = oddsArray.reduce((acc: number, odds: number) => {
    return acc * (odds > 0 ? odds / 100 + 1 : 100 / Math.abs(odds) + 1);
  }, 1);
  return decimal >= 2 ? Math.round((decimal - 1) * 100) : Math.round(-100 / (decimal - 1));
};

// Centralized derived state calculation
const _calculateTotals = (bets: Bet[], betType: 'single' | 'parlay') => {
  if (betType === 'parlay') {
    const totalStake = bets[0]?.stake ?? 0;
    const totalOdds = calculateParlayOdds(bets.map((b: Bet) => b.odds));
    const totalPayout = totalStake > 0 ? totalStake * (totalOdds > 0 ? (totalOdds / 100) + 1 : 1) : 0;
    return { totalStake, totalPayout, totalOdds };
  }
  const totalStake = bets.reduce((acc: number, bet: Bet) => acc + (bet.stake ?? 0), 0);
  const totalPayout = bets.reduce((acc: number, bet: Bet) => acc + (bet.potentialPayout ?? 0), 0);
  return { totalStake, totalPayout, totalOdds: 0 };
};

export const useBetSlipStore = create<BetSlipState>((set) => ({
  ...initialState,
  addBet: (bet: Bet) => set((state) => {
    const newBets = [...state.bets, bet];
    return { bets: newBets, ..._calculateTotals(newBets, state.betType) };
  }),
  removeBet: (betId: string) => set((state) => {
    const newBets = state.bets.filter((b) => b.id !== betId);
    return { bets: newBets, ..._calculateTotals(newBets, state.betType) };
  }),
  updateStake: (betId: string, stake: number) => set((state) => {
    const newBets = state.bets.map((b) => b.id === betId ? { ...b, stake } : b);
    return { bets: newBets, ..._calculateTotals(newBets, state.betType) };
  }),
  setBetType: (type: 'single' | 'parlay') => set((state) => {
    return { betType: type, ..._calculateTotals(state.bets, type) };
  }),
  clearBetSlip: () => set(() => ({ ...initialState })),
}));

export { calculateParlayOdds };
// _calculateTotals is intentionally not exported (internal only)
