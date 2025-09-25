import { create } from 'zustand';

export interface NavigationState {
  selectedSport: string | null;
  selectedLeague: string | null;
  mobilePanel: 'navigation' | 'workspace' | 'betslip' | null;
  setSelectedSport: (sport: string | null) => void;
  setSelectedLeague: (league: string | null) => void;
  setMobilePanel: (panel: 'navigation' | 'workspace' | 'betslip' | null) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  selectedSport: null,
  selectedLeague: null,
  mobilePanel: null,
  setSelectedSport: (sport) => set({ selectedSport: sport }),
  setSelectedLeague: (league) => set({ selectedLeague: league }),
  setMobilePanel: (panel) => set({ mobilePanel: panel }),
}));
