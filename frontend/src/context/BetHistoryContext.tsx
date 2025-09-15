import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { useBetSlipHistory, useAddBetSlipToHistory } from '@/hooks/useApi';
import { BetSlip } from '@/types';

// TODO: Replace with real user ID from auth context
const USER_ID = 'demo';

interface BetHistoryContextType {
  betHistory: BetSlip[];
  refreshHistory: () => void;
  addBetSlipToHistory: (betslipId: string) => Promise<void>;
}

export const BetHistoryContext = createContext<BetHistoryContextType | undefined>(undefined);

export const BetHistoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data: remoteHistory, loading, error } = useBetSlipHistory(USER_ID, 20);
  const addRemoteBetSlip = useAddBetSlipToHistory();
  const [betHistory, setBetHistory] = useState<BetSlip[]>([]);

  useEffect(() => {
    if (remoteHistory) setBetHistory(remoteHistory);
  }, [remoteHistory]);

  const refreshHistory = useCallback(() => {
    // Just re-run the hook by updating state (if needed)
    // No-op here, as useBetSlipHistory will update automatically
  }, []);

  const addBetSlipToHistory = useCallback(async (betslipId: string) => {
    await addRemoteBetSlip(USER_ID, betslipId);
    // Optionally, you could trigger a refresh here if needed
  }, [addRemoteBetSlip]);

  const value: BetHistoryContextType = {
    betHistory,
    refreshHistory,
    addBetSlipToHistory
  };

  return (
    <BetHistoryContext.Provider value={value}>
      {children}
    </BetHistoryContext.Provider>
  );
};

export function useBetHistoryContext() {
  const context = useContext(BetHistoryContext);
  if (context === undefined) {
    throw new Error('useBetHistoryContext must be used within a BetHistoryProvider.');
  }
  return context;
}
