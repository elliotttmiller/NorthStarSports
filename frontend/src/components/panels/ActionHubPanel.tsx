"use client";
import { useBetSlipStore } from "@/store/betSlipStore";
import { formatCurrency, formatOdds } from "@/lib/formatters";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";

export const ActionHubPanel = () => {
  const { bets, betType, totalStake, totalPayout, totalOdds, removeBet, updateStake, clearBetSlip, setBetType } = useBetSlipStore();
  const handleStakeChange = (betId: string, value: string) => { const stake = parseFloat(value) || 0; updateStake(betId, stake); };
  const handleParlayStakeChange = (value: string) => { const stake = parseFloat(value) || 0; if (bets.length > 0) { updateStake(bets[0].id, stake); } };

  return (
    <div className="p-4 flex flex-col h-full">
      <Card className="flex-1 flex flex-col bg-transparent border-0 shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl">Bet Slip</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0">
          <Tabs value={betType} onValueChange={(value) => setBetType(value as "single" | "parlay")} className="w-full flex-1 flex flex-col">
            <div className="px-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="single">Single</TabsTrigger>
                <TabsTrigger value="parlay" disabled={bets.length < 2}>Parlay</TabsTrigger>
              </TabsList>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {bets.length === 0 ? (<p className="text-muted-foreground text-center pt-16">Your bet slip is empty.</p>) : (bets.map((bet) => (
                <div key={bet.id} className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{bet.selection} {bet.line && `(${bet.line})`}</p>
                    <p className="text-sm text-muted-foreground">{bet.game.awayTeam.shortName} @ {bet.game.homeTeam.shortName}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="font-mono text-base">{formatOdds(bet.odds)}</Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => removeBet(bet.id)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              )))}
            </div>
            {bets.length > 0 && (
              <div className="p-6 border-t border-border/60 bg-background">
                <TabsContent value="single" className="space-y-4">
                  {bets.map((bet) => (
                    <div key={`stake-${bet.id}`} className="grid grid-cols-2 gap-4 items-center">
                      <p className="font-semibold text-sm truncate">{bet.selection}</p>
                      <Input type="number" placeholder="Stake" value={bet.stake || ""} onChange={(e) => handleStakeChange(bet.id, e.target.value)} />
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="parlay" className="space-y-4">
                  <div className="flex items-center justify-between"><span className="font-semibold">Parlay Odds</span><Badge className="font-mono text-lg">{formatOdds(totalOdds)}</Badge></div>
                  <Input type="number" placeholder="Total Stake" value={totalStake || ""} onChange={(e) => handleParlayStakeChange(e.target.value)} />
                </TabsContent>
                <Separator className="my-4 bg-border/60" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Total Stake:</span><span className="font-semibold">{formatCurrency(totalStake)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Total Payout:</span><span className="font-semibold text-win">{formatCurrency(totalPayout)}</span></div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <Button variant="outline" onClick={clearBetSlip}>Clear</Button>
                  <Button disabled={totalStake === 0}>Place Bet</Button>
                </div>
              </div>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};