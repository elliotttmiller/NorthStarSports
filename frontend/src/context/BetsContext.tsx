import React, { createContext, useContext } from "react";
import { Game } from "@/types";

const BetsContext = createContext<{ games: Game[]; loading: boolean }>({ games: [], loading: false });
export const BetsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Replace with real games logic
  const games: Game[] = [];
  const loading = false;
  return <BetsContext.Provider value={{ games, loading }}>{children}</BetsContext.Provider>;
};
export const useBets = () => useContext(BetsContext);
