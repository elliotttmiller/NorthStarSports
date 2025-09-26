"use client";

import { useBetSlipStore } from "@/store/betSlipStore";
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Header = () => {
  const bets = useBetSlipStore((state) => state.bets);
  const betCount = bets.length;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div className="mr-4 flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="font-bold text-lg">NorthStar Sports</span>
          </a>
        </div>
        <div className="flex items-center justify-end">
          <Button
            variant="outline"
            className="relative"
            // onClick={() => /* open bet slip modal logic here */}
          >
            <Calculator size={20} strokeWidth={2} color="currentColor" />
            <span className="ml-2 hidden sm:inline">Bet Slip</span>
            {betCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -right-2 -top-2 h-5 w-5 justify-center p-0"
              >
                {betCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};