"use client";

import { useBetSlip } from "@/context/BetSlipContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, X } from "lucide-react";
import { formatCurrency, formatOdds } from "@/lib/formatters";

export const BetSlipModal = () => {
  const {
    betSlip,
    isBetSlipOpen,
    setIsBetSlipOpen,
    removeBet,
    updateStake,
    clearBetSlip,
    setBetType,
  } = useBetSlip();

  const handleStakeChange = (betId: string, value: string) => {
    const stake = parseFloat(value) || 0;
    updateStake(betId, stake);
  };

  const handleParlayStakeChange = (value: string) => {
    const stake = parseFloat(value) || 0;
    // In parlay, all bets share one stake
    if (betSlip.bets.length > 0) {
      updateStake(betSlip.bets[0].id, stake, true);
    }
  };

  return (
    <Dialog open={isBetSlipOpen} onOpenChange={setIsBetSlipOpen}>
      <DialogContent className="sm:max-w-[425px] bg-background border-border/60">
        <DialogHeader>
          <DialogTitle className="text-2xl">Bet Slip</DialogTitle>
          <DialogDescription>
            Review your selections and place your bets.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={betSlip.betType}
          onValueChange={(value) => setBetType(value as "single" | "parlay")}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="single">Single Bets</TabsTrigger>
            <TabsTrigger value="parlay" disabled={betSlip.bets.length < 2}>
              Parlay
            </TabsTrigger>
          </TabsList>

          <div className="mt-4 max-h-[40vh] overflow-y-auto pr-2 space-y-4">
            {betSlip.bets.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                Your bet slip is empty.
              </p>
            ) : (
              betSlip.bets.map((bet) => (
                <div
                  key={bet.id}
                  className="flex items-center justify-between py-3 border-b border-border/30"
                >
                  <div>
                    <p className="font-semibold text-foreground">
                      {bet.selection} {bet.line && `(${bet.line})`}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {bet.game.awayTeam.shortName} @{" "}
                      {bet.game.homeTeam.shortName}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="font-mono text-base">
                      {formatOdds(bet.odds)}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => removeBet(bet.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {betSlip.bets.length > 0 && (
            <div className="mt-6">
              <Separator />
              <TabsContent value="single" className="mt-4 space-y-4">
                {betSlip.bets.map((bet) => (
                  <div key={`stake-${bet.id}`} className="space-y-2">
                    <p className="font-semibold text-sm">{bet.selection}</p>
                    <div className="flex items-center justify-between gap-4">
                      <Input
                        type="number"
                        placeholder="Stake"
                        value={bet.stake || ""}
                        onChange={(e) => handleStakeChange(bet.id, e.target.value)}
                        className="flex-1"
                      />
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Payout</p>
                        <p className="font-semibold text-win">
                          {formatCurrency(bet.potentialPayout)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="parlay" className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Parlay Odds</span>
                  <Badge className="font-mono text-lg">
                    {formatOdds(betSlip.totalOdds)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <Input
                    type="number"
                    placeholder="Total Stake"
                    value={betSlip.totalStake || ""}
                    onChange={(e) => handleParlayStakeChange(e.target.value)}
                    className="flex-1"
                  />
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Payout</p>
                    <p className="font-semibold text-win">
                      {formatCurrency(betSlip.totalPayout)}
                    </p>
                  </div>
                </div>
              </TabsContent>

              <Separator className="my-6" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Stake:</span>
                  <span className="font-semibold">
                    {formatCurrency(betSlip.totalStake)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Payout:</span>
                  <span className="font-semibold text-win">
                    {formatCurrency(betSlip.totalPayout)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </Tabs>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={clearBetSlip}>
            Clear All
          </Button>
          <Button className="flex-1" disabled={betSlip.totalStake === 0}>
            Place Bet
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};