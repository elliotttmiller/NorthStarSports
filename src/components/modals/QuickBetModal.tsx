/**
 * QuickBetModal - Core component of the unified betting workflow
 * Provides low-friction straight betting with seamless parlay progression
 */

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, CurrencyDollar } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useQuickBet } from '@/contexts/QuickBetContext'
import { useBetSlip, useBettingUtils } from '@/hooks'
import { cn } from '@/lib/utils'
import type { Bet } from '@/types'

export function QuickBetModal() {
  const { quickBetState, hideQuickBet, quickBetStake, updateQuickBetStake } = useQuickBet()
  const { addBet } = useBetSlip()
  const { calculatePayout, formatOdds, formatLine } = useBettingUtils()
  
  const [stake, setStake] = useState(quickBetStake)

  // Update local stake when context changes
  useEffect(() => {
    setStake(quickBetStake)
  }, [quickBetStake])

  if (!quickBetState.isVisible || !quickBetState.bet) {
    return null
  }

  const { bet } = quickBetState
  const potentialWin = calculatePayout(stake, bet.odds)
  const totalReturn = stake + potentialWin

  const handleStakeChange = (value: string) => {
    const numValue = Math.max(0, parseInt(value) || 0)
    setStake(numValue)
    updateQuickBetStake(numValue)
  }

  const handlePlaceStraightBet = () => {
    if (stake > 0) {
      const fullBet: Bet = {
        id: `${bet.gameId}-${bet.teamName}-${bet.betType}-${Date.now()}`,
        ...bet,
        stake
      }
      addBet(fullBet)
      hideQuickBet()
    }
  }

  const handleAddToBetSlip = () => {
    const fullBet: Bet = {
      id: `${bet.gameId}-${bet.teamName}-${bet.betType}-${Date.now()}`,
      ...bet,
      stake
    }
    addBet(fullBet)
    hideQuickBet()
  }

  const modalPosition = quickBetState.position
    ? {
        position: 'fixed' as const,
        left: Math.min(quickBetState.position.x, window.innerWidth - 320),
        top: Math.min(quickBetState.position.y, window.innerHeight - 400),
        transform: 'none'
      }
    : {
        position: 'fixed' as const,
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
      }

  return (
    <AnimatePresence>
      {quickBetState.isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={hideQuickBet}
          />

          {/* Quick Bet Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={modalPosition}
            className="z-50 w-80"
          >
            <Card className="p-6 shadow-xl border-2">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CurrencyDollar className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Quick Bet</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={hideQuickBet}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Bet Details */}
              <div className="space-y-3 mb-6">
                <div className="p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{bet.teamName}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatLine(bet as Bet)} {formatOdds(bet.odds)}
                      </p>
                    </div>
                    <Badge variant="secondary">
                      {bet.betType.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Stake Input */}
              <div className="space-y-3 mb-6">
                <Label htmlFor="stake">Stake Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="stake"
                    type="number"
                    value={stake}
                    onChange={(e) => handleStakeChange(e.target.value)}
                    className="pl-8"
                    placeholder="Enter stake"
                    min="0"
                  />
                </div>

                {/* Quick Stakes */}
                <div className="flex gap-2">
                  {[10, 25, 50, 100].map((amount) => (
                    <Button
                      key={amount}
                      variant={stake === amount ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleStakeChange(amount.toString())}
                      className="flex-1"
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Payout Information */}
              {stake > 0 && (
                <div className="space-y-2 mb-6 p-3 bg-accent/10 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span>Stake:</span>
                    <span>${stake.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>To Win:</span>
                    <span className="font-medium text-green-600">
                      ${potentialWin.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between font-medium border-t pt-2">
                    <span>Total Return:</span>
                    <span>${totalReturn.toFixed(2)}</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={handlePlaceStraightBet}
                  disabled={stake <= 0}
                  className="w-full"
                >
                  Place Straight Bet
                </Button>
                <Button
                  variant="outline"
                  onClick={handleAddToBetSlip}
                  disabled={stake <= 0}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add to Bet Slip
                </Button>
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}