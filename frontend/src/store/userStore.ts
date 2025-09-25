import { create } from 'zustand';

export interface UserState {
  user: {
    name?: string;
    email?: string;
  };
  setUser: (user: { name?: string; email?: string }) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: { name: 'Guest User', email: 'Welcome' },
  setUser: (user) => set({ user }),
}));
