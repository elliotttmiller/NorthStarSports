import { create } from 'zustand'

export interface BetSelection {
  id: string
  gameId: string
  market: 'spread' | 'total' | 'moneyline'
  team: string
  point?: number
  odds: number
  gameDetails: {
    homeTeam: string
    awayTeam: string
  }
}

interface BetSlipState {
  selections: Record<string, BetSelection>
  betType: 'single' | 'parlay'
  stakes: Record<string, string>
  parlayStake: string
  toggleSelection: (selection: BetSelection) => void
  removeSelection: (selectionId: string) => void
  clearAll: () => void
  setBetType: (type: 'single' | 'parlay') => void
  setStake: (selectionId: string, stake: string) => void
  setParlayStake: (stake: string) => void
}

export const useBetSlipStore = create<BetSlipState>((set) => ({
  selections: {},
  betType: 'single',
  stakes: {},
  parlayStake: '',
  toggleSelection: (selection: BetSelection) =>
    set((state) => {
      const exists = state.selections[selection.id]
      if (exists) {
        const { [selection.id]: _, ...rest } = state.selections // eslint-disable-line @typescript-eslint/no-unused-vars
        const { [selection.id]: __, ...restStakes } = state.stakes // eslint-disable-line @typescript-eslint/no-unused-vars
        return {
          selections: rest,
          stakes: restStakes,
        }
      } else {
        return {
          selections: {
            ...state.selections,
            [selection.id]: selection,
          },
        }
      }
    }),
  removeSelection: (selectionId: string) =>
    set((state) => {
      const { [selectionId]: _, ...rest } = state.selections // eslint-disable-line @typescript-eslint/no-unused-vars
      const { [selectionId]: __, ...restStakes } = state.stakes // eslint-disable-line @typescript-eslint/no-unused-vars
      return {
        selections: rest,
        stakes: restStakes,
      }
    }),
  clearAll: () => set({ selections: {}, stakes: {}, parlayStake: '' }),
  setBetType: (type: 'single' | 'parlay') => set({ betType: type }),
  setStake: (selectionId: string, stake: string) =>
    set((state) => ({
      stakes: {
        ...state.stakes,
        [selectionId]: stake,
      },
    })),
  setParlayStake: (stake: string) => set({ parlayStake: stake }),
}))