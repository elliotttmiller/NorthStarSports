import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { useBet, useSetBet } from '@/hooks/useApi';
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
  // For simplicity, this context can be refactored to fetch a single bet or a list as needed
  // Here, we provide a stub for a single bet (could be extended for a list)
  const { data: bet, loading, error } = useBet('demo-bet-id');
  const setBet = useSetBet();

  const refreshBets = useCallback(async () => {}, []); // No-op for now

  const addBet = useCallback(async (bet: Bet) => {
    await setBet(bet.id, bet);
    await refreshBets();
  }, [setBet, refreshBets]);

  const updateBet = useCallback(async (betId: string, bet: Partial<Bet>) => {
    await setBet(betId, bet);
    await refreshBets();
  }, [setBet, refreshBets]);

  const deleteBet = useCallback(async (betId: string) => {
    await setBet(betId, { deleted: true });
    await refreshBets();
  }, [setBet, refreshBets]);

  const value: BetsContextType = {
    bets: bet ? [bet] : [],
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
