import { create } from 'zustand'

interface UIState {
  isSportsOpen: boolean
  isBetSlipOpen: boolean
  toggleSports: () => void
  setSports: (open: boolean) => void
  toggleBetSlip: () => void
  setBetSlip: (open: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  isSportsOpen: false,
  isBetSlipOpen: false,
  toggleSports: () => set((state) => ({ isSportsOpen: !state.isSportsOpen })),
  setSports: (open: boolean) => set({ isSportsOpen: open }),
  toggleBetSlip: () => set((state) => ({ isBetSlipOpen: !state.isBetSlipOpen })),
  setBetSlip: (open: boolean) => set({ isBetSlipOpen: open }),
}))