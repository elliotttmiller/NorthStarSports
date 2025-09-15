import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { useBets, useSetBets } from '@/hooks/useApi';
import { Bet } from '@/types';

// TODO: Replace with real user ID from auth context
const USER_ID = 'demo';

interface BetsContextType {
  bets: Bet[];
  refreshBets: () => Promise<void>;
  addBet: (bet: Bet) => Promise<void>;
  updateBet: (betId: string, bet: Partial<Bet>) => Promise<void>;
  deleteBet: (betId: string) => Promise<void>;
}

export const BetsContext = createContext<BetsContextType | undefined>(undefined);

export const BetsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {


  // Fetch all active bets for the user
  const { data: betsRaw, loading, error } = useBets(USER_ID);
  const [bets, setLocalBets] = useState<Bet[]>(Array.isArray(betsRaw) ? betsRaw : []);
  const setBets = useSetBets();

  // Keep local bets in sync with remote
  useEffect(() => {
    if (Array.isArray(betsRaw)) setLocalBets(betsRaw);
  }, [betsRaw]);

  // Actually refetch bets from backend
  const refreshBets = useCallback(async () => {
    const res = await fetch('/api/bets/' + USER_ID);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) setLocalBets(data);
    }
  }, []);

  const addBet = useCallback(async (bet: Bet) => {
    const updatedBets: Bet[] = [...bets, bet];
    await setBets(USER_ID, updatedBets);
    await refreshBets();
  }, [bets, setBets, refreshBets]);

  const updateBet = useCallback(async (betId: string, bet: Partial<Bet>) => {
    const updatedBets: Bet[] = bets.map((b: Bet) => b.id === betId ? { ...b, ...bet } : b);
    await setBets(USER_ID, updatedBets);
    await refreshBets();
  }, [bets, setBets, refreshBets]);

  const deleteBet = useCallback(async (betId: string) => {
    const updatedBets: Bet[] = bets.filter((b: Bet) => b.id !== betId);
    await setBets(USER_ID, updatedBets);
    await refreshBets();
  }, [bets, setBets, refreshBets]);

  const value: BetsContextType = {
    bets,
    refreshBets,
    addBet,
    updateBet,
    deleteBet
  };

  return (
    <BetsContext.Provider value={value}>
      {children}
    </BetsContext.Provider>
  );
};

export function useBetsContext() {
  const context = useContext(BetsContext);
  if (context === undefined) {
    throw new Error('useBetsContext must be used within a BetsProvider.');
  }
  return context;
}
