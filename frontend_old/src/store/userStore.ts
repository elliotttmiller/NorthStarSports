import { create } from 'zustand';

export interface UserState {
  user: {
    name?: string;
    email?: string;
    avatar?: string;
  };
  setUser: (user: { name?: string; email?: string; avatar?: string }) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: { name: 'Guest User', email: 'Welcome', avatar: undefined },
  setUser: (user) => set({ user }),
}));
