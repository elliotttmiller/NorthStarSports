'use client';

import "./globals.css";
import { Header } from "@/components/ui/header";
import { BottomNav } from "@/components/ui/bottom-nav";
import { BetSlip } from "@/components/ui/bet-slip";
import { useState, createContext, useContext } from "react";

// Define the bet selection interface
interface BetSelection {
  id: string;
  gameTeams: string;
  gameTime: string;
  betType: string;
  selection: string;
  odds: string;
  decimalOdds: number;
}

// Create context for bet slip state
interface BetSlipContextType {
  selectedBets: BetSelection[];
  addBet: (bet: BetSelection) => void;
  removeBet: (id: string) => void;
  isBetSlipOpen: boolean;
  openBetSlip: () => void;
  closeBetSlip: () => void;
}

const BetSlipContext = createContext<BetSlipContextType | undefined>(undefined);

export const useBetSlip = () => {
  const context = useContext(BetSlipContext);
  if (!context) {
    throw new Error('useBetSlip must be used within BetSlipProvider');
  }
  return context;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [selectedBets, setSelectedBets] = useState<BetSelection[]>([]);
  const [isBetSlipOpen, setIsBetSlipOpen] = useState(false);

  const addBet = (bet: BetSelection) => {
    // Check if bet already exists
    if (!selectedBets.find(existingBet => existingBet.id === bet.id)) {
      setSelectedBets(prev => [...prev, bet]);
      setIsBetSlipOpen(true);
    }
  };

  const removeBet = (id: string) => {
    setSelectedBets(prev => prev.filter(bet => bet.id !== id));
  };

  const openBetSlip = () => setIsBetSlipOpen(true);
  const closeBetSlip = () => setIsBetSlipOpen(false);

  const betSlipValue = {
    selectedBets,
    addBet,
    removeBet,
    isBetSlipOpen,
    openBetSlip,
    closeBetSlip,
  };

  return (
    <html lang="en">
      <head>
        <title>NorthStar Sports</title>
        <meta name="description" content="Professional sports betting platform" />
      </head>
      <body>
        <BetSlipContext.Provider value={betSlipValue}>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 pb-20 lg:pb-0">
              {/* Master Layout Container - The Adaptive Outline */}
              <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {children}
              </div>
            </main>
            <BottomNav />
            
            {/* Floating Bet Slip Button - only show when there are selections */}
            {selectedBets.length > 0 && !isBetSlipOpen && (
              <button
                onClick={openBetSlip}
                className="fixed bottom-24 lg:bottom-8 right-4 lg:right-8 bg-primary text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 hover:bg-primary-light transition-colors"
              >
                <span className="font-semibold">Bet Slip</span>
                <span className="bg-white text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  {selectedBets.length}
                </span>
              </button>
            )}
            
            {/* Bet Slip Modal */}
            <BetSlip
              isOpen={isBetSlipOpen}
              onClose={closeBetSlip}
              selections={selectedBets}
              onRemoveSelection={removeBet}
            />
          </div>
        </BetSlipContext.Provider>
      </body>
    </html>
  );
}