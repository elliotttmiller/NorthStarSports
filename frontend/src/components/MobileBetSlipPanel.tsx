import { useBetSlip } from '@/context/BetSlipContext';
import { useNavigation } from '@/context/NavigationContext';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useBetsContext } from '@/context/BetsContext';
import { useBetHistoryContext } from '@/context/BetHistoryContext';
import { useUserContext } from '@/context/UserContext';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Stack, TrendUp } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { formatOdds } from '@/lib/formatters';

import { useState } from 'react';

// Minimal mobile betslip panel, can be styled further
export function MobileBetSlipPanel() {
  const { betSlip, removeBet, updateStake, setBetType, clearBetSlip } = useBetSlip();
  const { navigation, setIsBetSlipOpen } = useNavigation();
  const isMobile = useIsMobile();
  const isOpen = navigation.isBetSlipOpen;
  const { addBet } = useBetsContext();
  const { addBetSlipToHistory } = useBetHistoryContext();
  const { addBetSlipToHistory: addBetSlipToUserHistory } = useUserContext();
  const [placing, setPlacing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Helper to show a toast for 2s
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  // Place bets/parlay handler
  const handlePlaceBets = async () => {
    if (placing || betSlip.bets.length === 0) return;
    setPlacing(true);
    try {
      if (betSlip.betType === 'single') {
        // Place each bet as a single
        for (const bet of betSlip.bets) {
          await addBet(bet);
        }
      } else {
        // Place parlay as a group (store as one betslip in history)
        // Optionally, you could create a parlay bet object, but here we just add all bets
        for (const bet of betSlip.bets) {
          await addBet(bet);
        }
      }
      // Add betslip to history (both user and global)
      await addBetSlipToHistory(betSlip.bets.map(b => b.id).join(','));
      await addBetSlipToUserHistory(betSlip.bets.map(b => b.id).join(','));
      clearBetSlip();
      showToast('Bet(s) placed!');
      setIsBetSlipOpen(false);
    } catch (err) {
      showToast('Error placing bet(s)');
    } finally {
      setPlacing(false);
    }
  };

  if (!isMobile) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed right-0 bottom-0 left-0 z-[99] flex h-[88vh] max-h-[92vh] flex-col rounded-t-2xl border-t border-border bg-background/95 shadow-2xl backdrop-blur-xl"
        >
          {/* Close button */}
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <span className="font-bold text-lg">Bet Slip</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsBetSlipOpen(false)}
              className="text-foreground hover:bg-muted/20 rounded-full"
              aria-label="Close betslip"
            >
              <X size={24} />
            </Button>
          </div>
          <Separator className="mb-2" />
          {/* Bet type toggle */}
          <div className="px-4 pb-2">
            <Tabs value={betSlip.betType} onValueChange={setBetType} className="w-full">
              <TabsList
                className="w-full grid grid-cols-2 bg-muted rounded-2xl mb-4 shadow-sm border border-border/60 h-12"
                style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.06)', minHeight: 48 }}
              >
                <TabsTrigger
                  value="single"
                  className="rounded-2xl data-[state=active]:bg-accent data-[state=active]:text-accent-foreground text-base font-bold py-2 h-12 flex items-center justify-center transition-all"
                  style={{ fontSize: '1.1rem', letterSpacing: 0.1, borderRadius: '1rem' }}
                >
                  Straight
                </TabsTrigger>
                <TabsTrigger
                  value="parlay"
                  className="rounded-2xl data-[state=active]:bg-accent data-[state=active]:text-accent-foreground text-base font-bold py-2 h-12 flex items-center justify-center transition-all"
                  style={{ fontSize: '1.1rem', letterSpacing: 0.1, borderRadius: '1rem' }}
                >
                  Parlay
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          {/* Betslip content, scrollable */}
          <div className="flex-1 overflow-y-auto flex flex-col px-4 pb-2 scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {betSlip.betType === 'single' ? (
              betSlip.bets.map((bet) => (
                <Card
                  key={bet.id}
                  className="bg-card/95 border border-border/60 shadow-sm flex flex-col rounded-2xl px-0 py-3 mb-3"
                  style={{
                    borderRadius: '1.25rem',
                    boxShadow: '0 4px 16px 0 rgba(0,0,0,0.07)',
                    gap: '0.75rem',
                  }}
                >
                  <div className="flex items-center justify-between w-full mb-1 pl-5 pr-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-base font-bold leading-tight">{bet.game?.awayTeam?.shortName} <span className="text-muted-foreground font-normal">@</span> {bet.game?.homeTeam?.shortName}</span>
                    </div>
                    <Badge className="ml-2 text-accent border-accent/40 bg-accent/15 font-mono px-2.5 py-0.5 text-xs min-w-[32px] text-center flex items-center justify-center rounded-md">
                      {formatOdds(bet.odds)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 mt-2 pl-5">
                    <Input
                      type="number"
                      min="0"
                      max="10000"
                      step="1"
                      value={bet.stake || ''}
                      onChange={e => updateStake(bet.id, parseFloat(e.target.value) || 0)}
                      className="w-20 h-9 text-sm bg-background/60 border-border/60 rounded-lg font-medium px-3 py-1"
                      placeholder="Stake"
                      style={{ fontSize: '1rem', borderRadius: '0.75rem' }}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeBet(bet.id)}
                      className="text-destructive size-9 flex items-center justify-center rounded-full hover:bg-destructive/10"
                      style={{ marginLeft: 4 }}
                      aria-label="Remove bet"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <Card
                className="w-full bg-card border border-border shadow-2xl rounded-3xl mb-5"
                style={{ borderRadius: '1.5rem', padding: 0 }}
              >
                <CardHeader
                  className="flex items-center justify-between pb-1 pt-3 px-0"
                  style={{ gap: '0.5rem' }}
                >
                  <div className="flex items-center flex-1 min-w-0 pl-5">
                    <CardTitle className="text-base font-bold min-w-0 truncate">
                      Parlay Slip ({betSlip.bets.length} picks)
                    </CardTitle>
                  </div>
                  <div className="flex items-center min-w-[70px] justify-end pr-5">
                    <Badge variant="outline" className="border-accent/50 text-accent bg-accent/20 font-mono text-base px-2.5 py-1 min-w-[44px] text-center rounded-md">
                      {formatOdds(betSlip.totalOdds)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-2 px-0 pb-4 pt-1">
                  {betSlip.bets.map((bet) => (
                    <div key={bet.id} className="flex items-center justify-between pl-8 pr-5 py-2 bg-card/70 rounded-xl border border-border/40">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-foreground mb-0.5 truncate">
                          {bet.game?.awayTeam?.shortName} @ {bet.game?.homeTeam?.shortName}
                        </div>
                      </div>
                      <div className="flex items-center min-w-[56px] justify-end">
                        <Badge className="text-xs font-mono border-accent/40 text-accent bg-accent/15 px-2.5 py-0.5 min-w-[32px] text-center rounded-md">
                          {formatOdds(bet.odds)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 mt-2 pl-5">
                    <span className="text-base font-bold whitespace-nowrap">Total Stake:</span>
                    <Input
                      type="number"
                      min="0"
                      max="10000"
                      step="1"
                      value={betSlip.bets[0]?.stake || ''}
                      onChange={e => betSlip.bets[0] && updateStake(betSlip.bets[0].id, parseFloat(e.target.value) || 0)}
                      className="w-24 h-9 text-base bg-background/70 border-border/60 rounded-lg font-semibold text-right ml-auto"
                      placeholder="0.00"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          {/* Summary and Place Bet actions always at bottom */}
          {betSlip.bets.length > 0 && (
            <div className="p-4 border-t border-border bg-background/95 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground font-semibold">Total Stake:</span>
                <span className="font-bold text-foreground">${betSlip.totalStake.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground font-semibold">Potential Payout:</span>
                <span className="font-bold text-accent">${betSlip.totalPayout.toFixed(2)}</span>
              </div>
              <Button className="w-full mt-2" onClick={clearBetSlip} variant="destructive">Clear Bet Slip</Button>
              <Button
                className="w-full h-12 mt-2 font-bold text-lg rounded-xl shadow-lg bg-accent hover:bg-accent/90 text-accent-foreground flex items-center justify-center gap-2"
                onClick={handlePlaceBets}
                disabled={placing}
              >
                <TrendUp size={20} />
                {placing ? 'Placing...' : `Place ${betSlip.betType === 'single' ? 'Bets' : 'Parlay'}`}
              </Button>
              {toast && (
                <div className="mt-2 w-full text-center text-base font-semibold text-accent bg-accent/10 rounded-lg py-2 animate-fadeIn">
                  {toast}
                </div>
              )}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
