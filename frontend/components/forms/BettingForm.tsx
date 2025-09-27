import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { DollarSign, Calculator, TrendingUp } from 'lucide-react'

interface BettingFormProps {
  gameId: string
  betType: 'spread' | 'moneyline' | 'total'
  odds: number
  line?: number
  onPlaceBet?: (bet: any) => void
}

export default function BettingForm({ gameId, betType, odds, line, onPlaceBet }: BettingFormProps) {
  const [betAmount, setBetAmount] = useState('')
  const [betSide, setBetSide] = useState('')
  
  const calculatePayout = () => {
    const amount = parseFloat(betAmount) || 0
    if (odds > 0) {
      return amount + (amount * (odds / 100))
    } else {
      return amount + (amount * (100 / Math.abs(odds)))
    }
  }

  const potentialPayout = calculatePayout()
  const profit = potentialPayout - (parseFloat(betAmount) || 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (betAmount && betSide && onPlaceBet) {
      onPlaceBet({
        gameId,
        betType,
        betSide,
        amount: parseFloat(betAmount),
        odds,
        line,
        potentialPayout
      })
    }
  }

  return (
    <div className="bg-ns-card border border-ns-border rounded-lg p-fluid-lg">
      <div className="flex items-center gap-2 mb-fluid-base">
        <DollarSign className="w-5 h-5 text-ns-green" />
        <h3 className="text-fluid-lg font-semibold">Place Your Bet</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-fluid-base">
        {/* Bet Type Selection - Using @tailwindcss/forms styling */}
        <div>
          <label htmlFor="bet-type" className="block text-fluid-sm font-medium mb-2 text-ns-muted">
            Bet Type
          </label>
          <Select 
            id="bet-type"
            value={betType}
            className="w-full"
            disabled
          >
            <option value="spread">Spread {line && `(${line > 0 ? '+' : ''}${line})`}</option>
            <option value="moneyline">Moneyline ({odds > 0 ? '+' : ''}{odds})</option>
            <option value="total">Total {line && `(${line})`}</option>
          </Select>
        </div>

        {/* Bet Side Selection */}
        <div>
          <label htmlFor="bet-side" className="block text-fluid-sm font-medium mb-2 text-ns-muted">
            Selection
          </label>
          <Select 
            id="bet-side"
            value={betSide}
            onChange={(e) => setBetSide(e.target.value)}
            className="w-full"
            required
          >
            <option value="">Select side...</option>
            {betType === 'total' ? (
              <>
                <option value="over">Over {line}</option>
                <option value="under">Under {line}</option>
              </>
            ) : (
              <>
                <option value="home">Home Team</option>
                <option value="away">Away Team</option>
              </>
            )}
          </Select>
        </div>

        {/* Bet Amount Input - Professional forms styling */}
        <div>
          <label htmlFor="bet-amount" className="block text-fluid-sm font-medium mb-2 text-ns-muted">
            Bet Amount
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-ns-muted" />
            <Input
              id="bet-amount"
              type="number"
              placeholder="0.00"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              className="pl-10"
              min="1"
              step="0.01"
              required
            />
          </div>
        </div>

        {/* Quick Amount Buttons */}
        <div>
          <p className="text-fluid-sm font-medium mb-2 text-ns-muted">Quick Amounts</p>
          <div className="grid grid-cols-4 gap-2">
            {[25, 50, 100, 250].map((amount) => (
              <Button
                key={amount}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setBetAmount(amount.toString())}
                className="text-fluid-xs"
              >
                ${amount}
              </Button>
            ))}
          </div>
        </div>

        {/* Payout Calculator - Line clamp for description */}
        <div className="bg-ns-dark/50 rounded-md p-fluid-sm border border-ns-border/50">
          <div className="flex items-center gap-2 mb-2">
            <Calculator className="w-4 h-4 text-ns-blue" />
            <h4 className="text-fluid-sm font-medium">Bet Summary</h4>
          </div>
          
          <div className="space-y-1 text-fluid-sm">
            <div className="flex justify-between">
              <span className="text-ns-muted">Bet Amount:</span>
              <span>${betAmount || '0.00'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ns-muted">Potential Profit:</span>
              <span className="text-ns-green">
                +${profit > 0 ? profit.toFixed(2) : '0.00'}
              </span>
            </div>
            <div className="flex justify-between font-semibold border-t border-ns-border pt-1">
              <span>Total Payout:</span>
              <span className="text-ns-green">
                ${potentialPayout > 0 ? potentialPayout.toFixed(2) : '0.00'}
              </span>
            </div>
          </div>
        </div>

        {/* Terms and Conditions with line-clamp */}
        <div className="text-fluid-xs text-ns-muted">
          <p className="line-clamp-2">
            By placing this bet, you agree to our Terms of Service and acknowledge that all bets are final. 
            Minimum bet $1. Maximum payout restrictions may apply based on account status and betting history.
          </p>
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          className="w-full text-fluid-base py-fluid-sm"
          disabled={!betAmount || !betSide}
        >
          <TrendingUp className="w-4 h-4 mr-2" />
          Place Bet - ${betAmount || '0.00'}
        </Button>
      </form>
    </div>
  )
}

// Replace 'any' with a more specific type if possible, otherwise use 'unknown' or a proper interface