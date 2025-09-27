import { create } from 'zustand';
import type { Game } from '@/types';

export interface BetsState {
  games: Game[];
  loading: boolean;
  setGames: (games: Game[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useBetsStore = create<BetsState>((set) => ({
  games: [],
  loading: false,
  setGames: (games) => set({ games }),
  setLoading: (loading) => set({ loading }),
}));
