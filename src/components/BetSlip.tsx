import { useState } from 'react'
import { X, Calculator } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { useBetting } from '@/contexts/BettingContext'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

export function BetSlip() {
  const { 
    bets, 
    removeBet, 
    updateBetStake, 
    clearBets, 
    betSlipMode, 
    setBetSlipMode 
  } = useBetting()
  
  const [roundRobinOptions, setRoundRobinOptions] = useState({
    '2teams': false,
    '3teams': false
  })

  const formatOdds = (odds: number) => {
    if (odds > 0) return `+${odds}`
    return odds.toString()
  }

  const formatLine = (bet: any) => {
    if (bet.betType === 'spread') {
      const sign = bet.line > 0 ? '+' : ''
      return `${sign}${bet.line}`
    }
    if (bet.betType === 'total') {
      return `${bet.isOver ? 'o' : 'u'}${bet.line}`
    }
    return ''
  }

  const calculatePayout = (stake: number, odds: number) => {
    if (!stake || !odds) return 0
    
    if (odds > 0) {
      return stake * (odds / 100)
    } else {
      return stake * (100 / Math.abs(odds))
    }
  }

  const calculateParlayOdds = () => {
    if (bets.length < 2) return 0
    
    let combinedDecimal = 1
    bets.forEach(bet => {
      const decimal = bet.odds > 0 ? (bet.odds / 100) + 1 : (100 / Math.abs(bet.odds)) + 1
      combinedDecimal *= decimal
    })
    
    return combinedDecimal > 2 ? Math.round((combinedDecimal - 1) * 100) : -(100 / (combinedDecimal - 1))
  }

  const handlePlaceBet = () => {
    const hasStakes = bets.some(bet => bet.stake && bet.stake > 0)
    if (!hasStakes) {
      toast.error('Please enter bet amounts')
      return
    }
    
    toast.success('Bet placed successfully!')
    clearBets()
  }

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
          <div className="space-y-3">
            {bets.map((bet) => (
              <Card key={bet.id} className="p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{bet.teamName}</span>
                      <Badge variant="outline" className="text-xs">
                        {bet.betType.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatLine(bet)} {formatOdds(bet.odds)}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                    onClick={() => removeBet(bet.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="text-xs text-muted-foreground">Risk</label>
                      <Input
                        type="number"
                        placeholder="0"
                        className="h-8 text-sm"
                        value={bet.stake || ''}
                        onChange={(e) => updateBetStake(bet.id, Number(e.target.value))}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs text-muted-foreground">Win</label>
                      <Input
                        type="number"
                        placeholder="0"
                        className="h-8 text-sm"
                        value={bet.stake ? calculatePayout(bet.stake, bet.odds).toFixed(2) : ''}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="parlay" className="mt-4">
          {bets.length < 2 ? (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">
                Add at least 2 bets to create a parlay
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <Card className="p-3">
                <div className="space-y-3">
                  {bets.map((bet) => (
                    <div key={bet.id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{bet.teamName}</span>
                          <span className="text-xs text-muted-foreground">
                            {formatLine(bet)} {formatOdds(bet.odds)}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                        onClick={() => removeBet(bet.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Parlay Odds</span>
                    <span className="text-sm font-mono">
                      {formatOdds(calculateParlayOdds())}
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