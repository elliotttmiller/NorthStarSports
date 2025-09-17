import { useState } from 'react';
import type { Bet, Game } from '@/types';
import { useBetSlip } from '@/context/BetSlipContext';
import { useBetsContext } from '@/context/BetsContext';
import { useNavigation } from '@/context/NavigationContext';
import { useIsMobile } from '@/hooks/useIsMobile';
import { formatBetDescription, formatMatchup } from '@/lib/betFormatters';
import { AnimatePresence, motion } from 'framer-motion';
import { X, TrendUp, Trash } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { formatOdds } from '@/lib/formatters';
import { SmoothScrollContainer } from '@/components/VirtualScrolling';

// Minimal mobile betslip panel, can be styled further
export function MobileBetSlipPanel() {
  const { betSlip, removeBet, updateStake, setBetType, clearBetSlip } = useBetSlip();
  const { addBet, refreshBets } = useBetsContext();
  const { navigation, setIsBetSlipOpen } = useNavigation();
  const isMobile = useIsMobile();
  const [placing, setPlacing] = useState(false);
  const [toast, setToast] = useState<string>('');

  const isOpen = navigation.isBetSlipOpen;

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(''), 2000);
  };

  const handlePlaceBets = async () => {
    if (betSlip.bets.length === 0) return;
    
    setPlacing(true);
    
    try {
      if (betSlip.betType === 'single') {
        for (const bet of betSlip.bets) {
          // Create a proper Bet object with all required fields
          const newBet: Bet = {
            id: crypto.randomUUID(), // Generate new ID for the placed bet
            gameId: bet.gameId,
            betType: bet.betType,
            selection: bet.selection,
            odds: bet.odds,
            line: bet.line,
            stake: bet.stake,
            potentialPayout: bet.potentialPayout,
            game: bet.game,
            legs: bet.legs,
            periodOrQuarterOrHalf: bet.periodOrQuarterOrHalf,
            playerProp: bet.playerProp
          };
          await addBet(newBet);
        }
      } else {
        // For parlay, create a single bet with all legs
        const parlayBet: Bet = {
          id: crypto.randomUUID(),
          gameId: 'parlay', 
          betType: 'parlay' as const,
          selection: betSlip.bets[0]?.selection || 'over', // Default selection for parlay
          odds: betSlip.totalOdds,
          line: undefined,
          stake: betSlip.totalStake,
          potentialPayout: betSlip.totalPayout,
          game: betSlip.bets[0]?.game || {} as Game, // Use first game as representative
          legs: betSlip.bets // This preserves individual bet details
        };
        await addBet(parlayBet);
      }
      
      // Refresh active bets to show newly placed bets
      await refreshBets();
      
      showToast('Bet(s) placed successfully!');
      clearBetSlip();
      
      // Close panel after a short delay
      setTimeout(() => {
        setIsBetSlipOpen(false);
      }, 1500);
    } catch (error) {
      console.error('Failed to place bets:', error);
      showToast('Failed to place bets. Please try again.');
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
          className="fixed right-0 bottom-0 left-0 z-[99] flex h-[88vh] max-h-[92vh] flex-col rounded-t-2xl border-t border-border bg-muted/20 shadow-2xl backdrop-blur-xl professional-scroll professional-spacing-mobile"
        >
          {/* Minimal header - more compact */}
          <div className="flex items-center justify-between px-3 pt-3 pb-1">
            <span className="font-bold text-base">Bet Slip</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsBetSlipOpen(false)}
              className="text-foreground hover:bg-muted/20 rounded-full h-8 w-8"
              aria-label="Close betslip"
            >
              <X size={16} />
            </Button>
          </div>
          {/* Bet type toggle - more compact */}
          <div className="px-3 pb-2">
            <Tabs value={betSlip.betType} onValueChange={setBetType} className="w-full">
              <TabsList className="w-full grid grid-cols-2 bg-muted rounded-lg mb-1 border border-border/60 h-8">
                <TabsTrigger
                  value="single"
                  className="rounded-lg data-[state=active]:bg-accent data-[state=active]:text-accent-foreground text-xs font-bold py-1 h-8 flex items-center justify-center transition-all text-center"
                >
                  Straight
                </TabsTrigger>
                <TabsTrigger
                  value="parlay"
                  className="rounded-lg data-[state=active]:bg-accent data-[state=active]:text-accent-foreground text-xs font-bold py-1 h-8 flex items-center justify-center transition-all text-center"
                >
                  Parlay
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {/* Betslip content with invisible scrolling - more compact */}
          <SmoothScrollContainer 
            className="flex-1 min-h-0 professional-scroll" 
            showScrollbar={false}
            maxHeight="100%"
          >
            <div className="px-4 pb-3 space-y-3">
              {betSlip.betType === 'single' ? (
                betSlip.bets.map((bet) => (
                  <motion.div 
                    key={bet.id} 
                    className="bg-card/50 border border-border/20 rounded-xl p-3 shadow-sm ring-1 ring-border/10 hover:border-border/40 hover:shadow-md transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Professional Header Layout */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-foreground mb-1 leading-tight">
                          {formatBetDescription(bet)}
                        </div>
                        <div className="text-xs text-muted-foreground leading-tight">
                          {formatMatchup(bet)}
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <Badge className="text-accent border-accent/30 bg-accent/10 font-mono px-6 py-1.5 text-sm font-bold rounded-lg min-w-[120px] flex items-center justify-center">
                          {formatOdds(bet.odds)}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Divider */}
                    <div className="h-px bg-border/20 mb-3"></div>
                    
                    {/* Financial Section - Grid Layout */}
                    <div className="grid grid-cols-3 gap-2 items-center">
                      {/* Stake Input */}
                      <div className="col-span-1">
                        <label className="block text-xs font-semibold text-muted-foreground mb-1">Stake</label>
                        <Input
                          type="number"
                          min="0"
                          max="10000"
                          step="1"
                          value={bet.stake || ''}
                          onChange={(e) => updateStake(bet.id, parseFloat(e.target.value) || 0)}
                          className="h-8 text-sm bg-background/80 border-border/40 rounded-lg text-center font-semibold focus:border-accent/50 focus:ring-1 focus:ring-accent/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          placeholder="0"
                        />
                      </div>
                      
                      {/* Win Amount */}
                      <div className="col-span-1">
                        <label className="block text-xs font-semibold text-muted-foreground mb-1">Win</label>
                        <div className="h-8 flex items-center justify-center bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/20 rounded-lg px-2">
                          <span className="text-sm font-bold text-green-600">
                            ${bet.stake > 0 ? (bet.potentialPayout - bet.stake).toFixed(2) : '0.00'}
                          </span>
                        </div>
                      </div>
                      
                      {/* Delete Button */}
                      <div className="col-span-1 flex justify-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeBet(bet.id)}
                          className="h-8 w-8 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200"
                        >
                          <Trash size={14} />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Total Payout Badge */}
                    <div className="mt-3 pt-2 border-t border-border/20">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-muted-foreground">Total Payout</span>
                        <div className="bg-accent/10 border border-accent/20 rounded-lg px-2.5 py-1">
                          <span className="text-sm font-bold text-accent">
                            ${bet.potentialPayout.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  className="bg-card/50 border border-accent/20 rounded-xl p-3 shadow-sm ring-1 ring-accent/10 hover:border-accent/40 hover:shadow-md transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Professional Parlay Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-accent/10 rounded-lg">
                        <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-foreground">Parlay Bet</div>
                        <div className="text-xs text-muted-foreground">{betSlip.bets.length} selections</div>
                      </div>
                    </div>
                    <Badge className="text-accent border-accent/30 bg-accent/10 font-mono px-6 py-1.5 text-sm font-bold rounded-lg min-w-[120px] flex items-center justify-center">
                      {formatOdds(betSlip.totalOdds)}
                    </Badge>
                  </div>
                  
                  {/* Parlay Legs - Professional List */}
                  <div className="space-y-2 mb-3">
                    {betSlip.bets.map((bet, index) => (
                      <div key={bet.id} className="bg-background/50 border border-border/20 rounded-lg p-2.5">
                        <div className="flex items-start justify-between mb-1.5">
                          <div className="flex items-start gap-2 flex-1">
                            <div className="w-4 h-4 bg-accent/20 text-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold">{index + 1}</span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-sm font-semibold text-foreground leading-tight">
                                {formatBetDescription(bet)}
                              </div>
                              <div className="text-xs text-muted-foreground leading-tight mt-0.5">
                                {formatMatchup(bet)}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-3">
                            <Badge className="text-muted-foreground border-border/30 bg-muted/20 font-mono px-3 py-0.5 text-xs font-bold rounded min-w-[70px] flex items-center justify-center">
                              {formatOdds(bet.odds)}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeBet(bet.id)}
                              className="h-6 w-6 rounded-md text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200"
                            >
                              <Trash size={10} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Divider */}
                  <div className="h-px bg-border/20 mb-3"></div>
                  
                  {/* Parlay Financial Section */}
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1">Total Stake</label>
                      <Input
                        type="number"
                        min="0"
                        max="10000"
                        step="1"
                        value={betSlip.bets[0]?.stake || ''}
                        onChange={(e) => betSlip.bets[0] && updateStake(betSlip.bets[0].id, parseFloat(e.target.value) || 0)}
                        className="h-8 text-sm bg-background/80 border-border/40 rounded-lg text-center font-semibold focus:border-accent/50 focus:ring-1 focus:ring-accent/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1">Total Win</label>
                      <div className="h-8 flex items-center justify-center bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/20 rounded-lg">
                        <span className="text-sm font-bold text-green-600">
                          ${betSlip.totalPayout > betSlip.totalStake ? (betSlip.totalPayout - betSlip.totalStake).toFixed(2) : '0.00'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Total Payout */}
                  <div className="pt-2 border-t border-border/20">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-muted-foreground">Total Payout</span>
                      <div className="bg-accent/10 border border-accent/20 rounded-lg px-3 py-1.5">
                        <span className="text-base font-bold text-accent">
                          ${betSlip.totalPayout.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </SmoothScrollContainer>
          
          {/* Professional Summary Section */}
          {betSlip.bets.length > 0 && (
            <div className="border-t border-border/20 bg-muted/10 p-4 space-y-4">
              {/* Enhanced Summary Card */}
              <div className="bg-gradient-to-r from-secondary/10 to-secondary/20 border border-border/30 rounded-xl p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground mb-1">Total Stake</div>
                    <div className="text-base font-bold text-foreground">
                      ${betSlip.totalStake.toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground mb-1">Total Win</div>
                    <div className="text-base font-bold text-green-600">
                      ${betSlip.totalPayout > betSlip.totalStake ? (betSlip.totalPayout - betSlip.totalStake).toFixed(2) : '0.00'}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground mb-1">Payout</div>
                    <div className="text-base font-bold text-accent">
                      ${betSlip.totalPayout.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Professional Action Buttons */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  onClick={clearBetSlip}
                  className="w-full h-11 text-sm border-border/40 bg-background/50 hover:bg-background/80 rounded-xl transition-all duration-200"
                >
                  Clear Bet Slip
                </Button>
                <Button
                  onClick={handlePlaceBets}
                  disabled={placing}
                  className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <TrendUp size={18} className="mr-2" />
                  {placing ? 'Placing Bets...' : `Place ${betSlip.betType === 'single' ? 'Bets' : 'Parlay'} • $${betSlip.totalPayout.toFixed(2)}`}
                </Button>
              </div>
              
              {/* Toast Message */}
              {toast && (
                <div className="w-full text-center text-xs font-semibold text-accent bg-accent/10 rounded-lg py-2 border border-accent/20">
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
