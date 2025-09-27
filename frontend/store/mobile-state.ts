import { create } from 'zustand'

interface MobileState {
  isMenuOpen: boolean
  isBetSheetOpen: boolean
  toggleMenu: () => void
  setMenu: (open: boolean) => void
  toggleBetSheet: () => void
  setBetSheet: (open: boolean) => void
}

export const useMobileStore = create<MobileState>((set) => ({
  isMenuOpen: false,
  isBetSheetOpen: false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  setMenu: (open: boolean) => set({ isMenuOpen: open }),
  toggleBetSheet: () => set((state) => ({ isBetSheetOpen: !state.isBetSheetOpen })),
  setBetSheet: (open: boolean) => set({ isBetSheetOpen: open }),
}))