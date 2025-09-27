"use client";

import { useState } from "react";
import BettingForm from "@/components/forms/BettingForm";
import { Button } from "@/components/ui/button";
import { Play, TrendingUp } from "lucide-react";

// Define types for live game and bet
export type LiveGame = {
  id: string;
  awayTeam: string;
  homeTeam: string;
  awayScore: number;
  homeScore: number;
  quarter: string;
  timeLeft: string;
  spread: { odds: number; home: number };
  moneyline: { home: number };
  total: { odds: number; over: number };
};

export type BetType = "spread" | "moneyline" | "total";

export type SelectedBet = {
  gameId: string;
  betType: BetType;
  odds: number;
  line?: number;
} | null;

interface LiveBettingProps {
  games: LiveGame[];
}

export default function LiveBetting({ games }: LiveBettingProps) {
  const [selectedBet, setSelectedBet] = useState<SelectedBet>(null);

  const handleBetSelection = (
    gameId: string,
    betType: BetType,
    odds: number,
    line?: number
  ) => {
    // Only include 'line' if defined
    const bet: SelectedBet = line !== undefined
      ? { gameId, betType, odds, line }
      : { gameId, betType, odds };
    setSelectedBet(bet);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-fluid-2xl">
        <h2 className="text-fluid-4xl font-bold mb-fluid-base">Live Betting</h2>
        <p className="text-fluid-lg text-ns-muted line-clamp-2">
          Bet on games in progress with real-time odds updates and instant action.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-fluid-xl">
        {/* Live Games List */}
        <div className="lg:col-span-2">
          <div className="space-y-fluid-base">
            {games && games.length > 0 ? (
              games.map((game: LiveGame) => (
                <div
                  key={game.id}
                  className="bg-ns-card border border-ns-border rounded-lg p-fluid-lg"
                >
                  {/* Game Header */}
                  <div className="flex items-center justify-between mb-fluid-base">
                    <div className="flex items-center gap-2">
                      <div className="bg-ns-red/20 p-2 rounded-full">
                        <Play className="w-4 h-4 text-ns-red fill-current" />
                      </div>
                      <span className="text-fluid-sm font-medium text-ns-red">
                        LIVE
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-fluid-sm font-medium">
                        {game.quarter} Quarter
                      </p>
                      <p className="text-fluid-xs text-ns-muted">
                        {game.timeLeft}
                      </p>
                    </div>
                  </div>

                  {/* Teams and Scores */}
                  <div className="space-y-fluid-sm mb-fluid-base">
                    <div className="flex items-center justify-between">
                      <span className="text-fluid-lg font-medium">
                        {game.awayTeam}
                      </span>
                      <span className="text-fluid-2xl font-bold">
                        {game.awayScore}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-fluid-lg font-medium">
                        {game.homeTeam}
                      </span>
                      <span className="text-fluid-2xl font-bold">
                        {game.homeScore}
                      </span>
                    </div>
                  </div>

                  {/* Live Betting Options */}
                  <div className="grid grid-cols-3 gap-fluid-sm">
                    <div className="text-center">
                      <p className="text-fluid-xs text-ns-muted mb-1">Spread</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() =>
                          handleBetSelection(
                            game.id,
                            "spread",
                            game.spread.odds,
                            game.spread.home
                          )
                        }
                      >
                        {game.spread.home > 0 ? "+" : ""}
                        {game.spread.home}
                      </Button>
                    </div>

                    <div className="text-center">
                      <p className="text-fluid-xs text-ns-muted mb-1">
                        Moneyline
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() =>
                          handleBetSelection(
                            game.id,
                            "moneyline",
                            game.moneyline.home
                          )
                        }
                      >
                        {game.moneyline.home > 0 ? "+" : ""}
                        {game.moneyline.home}
                      </Button>
                    </div>

                    <div className="text-center">
                      <p className="text-fluid-xs text-ns-muted mb-1">Total</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() =>
                          handleBetSelection(
                            game.id,
                            "total",
                            game.total.odds,
                            game.total.over
                          )
                        }
                      >
                        O {game.total.over}
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>No live games available.</div>
            )}
          </div>
        </div>

        {/* Betting Form Sidebar */}
        <div className="lg:col-span-1">
          {selectedBet ? (
            <BettingForm
              gameId={selectedBet.gameId}
              betType={selectedBet.betType}
              odds={selectedBet.odds}
              {...(selectedBet.line !== undefined ? { line: selectedBet.line } : {})}
              onPlaceBet={(bet) => {
                console.log("Bet placed:", bet);
                setSelectedBet(null);
              }}
            />
          ) : (
            <div className="bg-ns-card border border-ns-border rounded-lg p-fluid-lg text-center">
              <TrendingUp className="w-12 h-12 text-ns-muted mx-auto mb-fluid-base" />
              <h3 className="text-fluid-lg font-semibold mb-fluid-sm">
                Select a Bet
              </h3>
              <p className="text-fluid-sm text-ns-muted line-clamp-2">
                Click on any betting option from the live games to place your bet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}