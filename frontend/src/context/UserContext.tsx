"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useUser, useSetUser } from "@/hooks/useApi";
import { Profile, BetHistoryItem } from "@/types";

// Integrate real user ID from AuthContext here when available
const USER_ID = "demo";

interface UserContextType {
  user: Profile | null;
  updateUser: (profile: Partial<Profile>) => Promise<void>;
  addDeposit: (amount: number) => Promise<void>;
  addBetSlipToHistory: (betslipId: string) => Promise<void>;
}

const defaultProfile: Profile = {
  id: "",
  name: "",
  username: "Demo",
  email: "demo@email.com",
  balance: 1000,
  depositHistory: [],
  betHistory: [],
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { data: remoteUser, loading } = useUser(USER_ID);
  const setRemoteUser = useSetUser();
  const [user, setUser] = useState<Profile | null>(defaultProfile);

  useEffect(() => {
    if (remoteUser && !loading) setUser({ ...defaultProfile, ...remoteUser });
  }, [remoteUser, loading]);

  const updateUser = useCallback(
    async (profile: Partial<Profile>) => {
      const nextUser: Profile = {
        id: user?.id ?? "",
        name: user?.name ?? "",
        username: profile.username ?? user?.username ?? "",
        email: profile.email ?? user?.email ?? "",
        balance: profile.balance ?? user?.balance ?? 0,
        depositHistory: profile.depositHistory ?? user?.depositHistory ?? [],
        betHistory: profile.betHistory ?? user?.betHistory ?? [],
      };
      setUser(nextUser);
      await setRemoteUser(USER_ID, nextUser);
    },
    [user, setRemoteUser],
  );

  const addDeposit = useCallback(
    async (amount: number) => {
      const deposit = { amount, date: new Date().toISOString() };
      const nextUser: Profile = {
        id: user?.id ?? "",
        name: user?.name ?? "",
        username: user?.username ?? "",
        email: user?.email ?? "",
        balance: (user?.balance || 0) + amount,
        depositHistory: [...(user?.depositHistory || []), deposit],
        betHistory: user?.betHistory ?? [],
      };
      setUser(nextUser);
      await setRemoteUser(USER_ID, nextUser);
    },
    [user, setRemoteUser],
  );

  const addBetSlipToHistory = useCallback(
    async (betslipId: string) => {
      const betHistoryItem: BetHistoryItem = {
        betId: betslipId,
        result: "",
        timestamp: new Date().toISOString(),
      };
      const nextUser: Profile = {
        id: user?.id ?? "",
        name: user?.name ?? "",
        username: user?.username ?? "",
        email: user?.email ?? "",
        balance: user?.balance ?? 0,
        depositHistory: user?.depositHistory ?? [],
        betHistory: [...(user?.betHistory || []), betHistoryItem],
      };
      setUser(nextUser);
      await setRemoteUser(USER_ID, nextUser);
    },
    [user, setRemoteUser],
  );

  const value: UserContextType = {
    user,
    updateUser,
    addDeposit,
    addBetSlipToHistory,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider.");
  }
  return context;
};
