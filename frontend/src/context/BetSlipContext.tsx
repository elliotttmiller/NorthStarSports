import React, { createContext, useContext } from "react";
import { Bet, BetSlip, Game } from "@/types";

const defaultBetSlip: BetSlip = { bets: [], betType: "single", totalStake: 0, totalPayout: 0, totalOdds: 0 };
const BetSlipContext = createContext({
  betSlip: defaultBetSlip,
  addBet: (game: Game, betType: any, selection: any, odds: any, line?: any) => {},
  removeBet: (betId: string) => {},
  updateStake: (betId: string, stake: number) => {},
  setBetType: (betType: "single" | "parlay") => {},
  clearBetSlip: () => {},
});
export const BetSlipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Replace with real bet slip logic
  return <BetSlipContext.Provider value={{ betSlip: defaultBetSlip, addBet: () => {}, removeBet: () => {}, updateStake: () => {}, setBetType: () => {}, clearBetSlip: () => {} }}>{children}</BetSlipContext.Provider>;
};
export const useBetSlip = () => useContext(BetSlipContext);
