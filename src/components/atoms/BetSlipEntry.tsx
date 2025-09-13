/**
 * BetSlipEntry - Atomic Component
 * Individual bet entry in the bet slip
 * Follows Protocol of Radical Reusability
 */

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { X } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { useBettingUtils } from '@/hooks'
import type { BetSlipEntryProps } from '@/types'

function BetSlipEntryComponent({ 
  bet, 
  onRemove, 
  onStakeChange,
  className,
  ...props 
}: BetSlipEntryProps & React.HTMLAttributes<HTMLDivElement>) {
  const { formatOdds, formatLine, calculatePayout } = useBettingUtils()
  const [stake, setStake] = useState(bet.stake?.toString() || '')

  const handleStakeChange = (value: string) => {
    setStake(value)
    const numericValue = parseFloat(value) || 0
    onStakeChange(bet.id, numericValue)
  }

  const payout = calculatePayout(bet.stake || 0, bet.odds)

  return (
    <div 
      className={cn(
        "p-fluid-sm border border-border rounded-md bg-card",
        "fluid-container space-y-3",
        className
      )}
      {...props}
    >
      {/* Bet Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium overflow-safe">{bet.teamName}</span>
            <Badge variant="outline" className="text-xs">
              {bet.betType.toUpperCase()}
            </Badge>
          </div>
          <div className="text-xs text-muted-foreground overflow-safe">
            {formatLine(bet)} {formatOdds(bet.odds)}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive flex-shrink-0"
          onClick={() => onRemove(bet.id)}
          aria-label="Remove bet"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Stake Input */}
      <div className="space-y-2">
        <label htmlFor={`stake-${bet.id}`} className="text-xs font-medium text-muted-foreground">
          Stake
        </label>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">$</span>
          <Input
            id={`stake-${bet.id}`}
            type="number"
            placeholder="0"
            value={stake}
            onChange={(e) => handleStakeChange(e.target.value)}
            className="text-sm h-8"
            min="0"
            step="0.01"
          />
        </div>
      </div>

      {/* Payout Display */}
      {bet.stake && bet.stake > 0 && (
        <div className="flex justify-between items-center pt-2 border-t border-border/50">
          <span className="text-xs text-muted-foreground">Potential Payout:</span>
          <span className="text-sm font-medium text-green-600">
            ${(bet.stake + payout).toFixed(2)}
          </span>
        </div>
      )}
    </div>
  )
}

// Memoized export for performance optimization
export const BetSlipEntry = React.memo(BetSlipEntryComponent)