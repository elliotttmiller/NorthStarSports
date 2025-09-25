import React, { createContext, useContext, useEffect, useState } from 'react';
import { getApiService } from '@/services/ApiServiceFactory';
import type { Bet, Game, User } from '@/types';

interface BetsContextValue {
  games: Game[];
  bets: Bet[];
  user: User | null;
  loading: boolean;
  refresh: () => void;
}

const BetsContext = createContext<BetsContextValue | undefined>(undefined);

export const BetsProvider: React.FC<{ userId: string; children: React.ReactNode }> = ({ userId, children }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [bets, setBets] = useState<Bet[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const apiService = getApiService();

  const refresh = async () => {
    setLoading(true);
    setGames(await apiService.getGames());
    setBets(await apiService.getBets());
    setUser(await apiService.getUser(userId));
    setLoading(false);
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <BetsContext.Provider value={{ games, bets, user, loading, refresh }}>
      {children}
    </BetsContext.Provider>
  );
};

export const useBets = () => {
  const ctx = useContext(BetsContext);
  if (!ctx) throw new Error('useBets must be used within a BetsProvider');
  return ctx;
};
