"use client";
import { useBetSlip } from "@/context/BetSlipContext";
import { Calculator } from "@phosphor-icons/react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export const Header = () => {
  const { betSlip, setIsBetSlipOpen } = useBetSlip();
  const betCount = betSlip.bets.length;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div className="mr-4 flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="font-bold text-lg">NorthStar Sports</span>
          </a>
        </div>
        <div className="flex items-center justify-end">
          <Button variant="outline" className="relative" onClick={() => setIsBetSlipOpen(true)}>
            <Calculator size={20} />
            <span className="ml-2 hidden sm:inline">Bet Slip</span>
            {betCount > 0 && (
              <Badge variant="destructive" className="absolute -right-2 -top-2 h-5 w-5 justify-center p-0">{betCount}</Badge>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};
