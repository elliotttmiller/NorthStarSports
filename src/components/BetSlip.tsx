import { useState } from 'react'
import { Calculator } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { BetSlipEntry } from '@/components/atoms'
import { useBetSlip, useBettingUtils } from '@/hooks'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

export function BetSlip() {
  const { 
    bets, 
    removeBet, 
    updateBetStake, 
    clearBets, 
    betSlipMode, 
    setBetSlipMode 
  } = useBetSlip()
  
  const { calculateParlayOdds, formatOdds, formatLine } = useBettingUtils()
  
  const [roundRobinOptions, setRoundRobinOptions] = useState({
    '2teams': false,
    '3teams': false
  })

  const handlePlaceBet = () => {
    const hasStakes = bets.some(bet => bet.stake && bet.stake > 0)
    if (!hasStakes) {
      toast.error('Please enter bet amounts')
      return
    }
    
    toast.success('Bet placed successfully!')
    clearBets()
  }

  const parlayOdds = calculateParlayOdds(bets)

  if (bets.length === 0) {
    return (
      <div className="p-4 flex flex-col items-center justify-center flex-1 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Calculator className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No Bets Selected</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Select odds from the sportsbook to build your bet slip
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <Tabs 
        value={betSlipMode} 
        onValueChange={(value) => setBetSlipMode(value as 'straight' | 'parlay')}
        className="px-4"
      >
        <TabsList className="w-full">
          <TabsTrigger value="straight" className="flex-1">Straight</TabsTrigger>
          <TabsTrigger value="parlay" className="flex-1">
            Parlay
            {bets.length > 1 && (
              <Badge variant="secondary" className="ml-2 px-1.5 py-0.5 text-xs">
                {bets.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="straight" className="mt-4">
          <div className="space-y-fluid-sm fluid-container">
            <AnimatePresence mode="popLayout">
              {bets.map((bet) => (
                <motion.div
                  key={bet.id}
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  layout
                >
                  <BetSlipEntry
                    bet={bet}
                    onRemove={removeBet}
                    onStakeChange={updateBetStake}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </TabsContent>

        <TabsContent value="parlay" className="mt-4">
          {bets.length < 2 ? (
            <div className="text-center py-8 fluid-container">
              <p className="text-sm text-muted-foreground overflow-safe">
                Add at least 2 bets to create a parlay
              </p>
            </div>
          ) : (
            <div className="space-y-fluid-md fluid-container">
              <Card className="p-fluid-sm">
                <div className="space-y-3">
                  <AnimatePresence mode="popLayout">
                    {bets.map((bet) => (
                      <motion.div
                        key={bet.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.15 }}
                        layout
                        className="flex items-center justify-between"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium overflow-safe">{bet.teamName}</span>
                            <span className="text-xs text-muted-foreground overflow-safe">
                              {formatLine(bet)} {formatOdds(bet.odds)}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive flex-shrink-0"
                          onClick={() => removeBet(bet.id)}
                          aria-label="Remove bet from parlay"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </Card>

              <Card className="p-fluid-sm">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium overflow-safe">Parlay Odds</span>
                    <span className="text-sm font-mono overflow-safe">
                      {formatOdds(parlayOdds)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="text-xs text-muted-foreground">Risk</label>
                      <Input
                        type="number"
                        placeholder="0"
                        className="h-8 text-sm"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs text-muted-foreground">Win</label>
                      <Input
                        type="number"
                        placeholder="0"
                        className="h-8 text-sm"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Round Robin Section */}
      {bets.length >= 3 && (
        <div className="px-4 py-3 border-t mt-4">
          <h4 className="text-sm font-medium mb-2">Round Robin</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="2teams"
                checked={roundRobinOptions['2teams']}
                onCheckedChange={(checked) => 
                  setRoundRobinOptions(prev => ({ ...prev, '2teams': !!checked }))
                }
              />
              <label htmlFor="2teams" className="text-sm">
                Parlay of 2 Teams ({Math.floor(bets.length * (bets.length - 1) / 2)} bets)
              </label>
            </div>
            {bets.length >= 3 && (
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="3teams"
                  checked={roundRobinOptions['3teams']}
                  onCheckedChange={(checked) => 
                    setRoundRobinOptions(prev => ({ ...prev, '3teams': !!checked }))
                  }
                />
                <label htmlFor="3teams" className="text-sm">
                  Parlay of 3 Teams ({Math.floor(bets.length * (bets.length - 1) * (bets.length - 2) / 6)} bets)
                </label>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="p-4 border-t mt-auto">
        <div className="flex gap-2">
          <Button variant="outline" onClick={clearBets} className="flex-1">
            Clear All
          </Button>
          <Button onClick={handlePlaceBet} className="flex-1">
            Place Bet ({bets.length})
          </Button>
        </div>
      </div>
    </div>
  )
}