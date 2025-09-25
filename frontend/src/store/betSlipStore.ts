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

const calculateTotals = (bets: Bet[], betType: 'single' | 'parlay') => {
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

export const useBetSlipStore = create<BetSlipState>((set: (fn: (state: BetSlipState) => Partial<BetSlipState>) => void) => ({
  ...initialState,
  addBet: (bet: Bet) => set((state: BetSlipState) => {
    const newBets = [...state.bets, bet];
    const totals = calculateTotals(newBets, state.betType);
    return { bets: newBets, ...totals };
  }),
  removeBet: (betId: string) => set((state: BetSlipState) => {
    const newBets = state.bets.filter((b: Bet) => b.id !== betId);
    const totals = calculateTotals(newBets, state.betType);
    return { bets: newBets, ...totals };
  }),
  updateStake: (betId: string, stake: number) => set((state: BetSlipState) => {
    const newBets = state.bets.map((b: Bet) => b.id === betId ? { ...b, stake } : b);
    const totals = calculateTotals(newBets, state.betType);
    return { bets: newBets, ...totals };
  }),
  setBetType: (type: 'single' | 'parlay') => set((state: BetSlipState) => {
    const totals = calculateTotals(state.bets, type);
    return { betType: type, ...totals };
  }),
  clearBetSlip: () => set(() => ({ ...initialState })),
}));

export { calculateParlayOdds };
