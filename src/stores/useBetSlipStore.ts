import { create } from 'zustand';
import { Bet } from '../../frontend/src/types/index';

export interface BetSlipState {
  bets: Bet[];
  betType: 'single' | 'parlay';
  addBet: (bet: Bet) => void;
  removeBet: (betId: string) => void;
  updateStake: (betId: string, stake: number) => void;
  clearBetSlip: () => void;
  setBetType: (type: 'single' | 'parlay') => void;
}

export const useBetSlipStore = create<BetSlipState>((set) => ({
  bets: [],
  betType: 'single',
  addBet: (bet) => set((state) => ({ bets: [...state.bets, bet] })),
  removeBet: (betId) => set((state) => ({ bets: state.bets.filter((b) => b.id !== betId) })),
  updateStake: (betId, stake) => set((state) => ({
    bets: state.bets.map((b) => b.id === betId ? { ...b, stake } : b)
  })),
  clearBetSlip: () => set(() => ({ bets: [] })),
  setBetType: (type) => set(() => ({ betType: type })),
}));
