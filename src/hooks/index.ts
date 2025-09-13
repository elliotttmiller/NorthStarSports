/**
 * Custom Hooks for Decoupled State Management
 * Following the Protocol of Decoupled Logic
 */

import { useBetting as useBettingContext } from '@/contexts/BettingContext'
import { useNavigation as useNavigationContext } from '@/contexts/NavigationContext'
import type { Bet } from '@/types'

/**
 * Bet Slip Management Hook
 * Abstracts all bet-related operations
 */
export function useBetSlip() {
  const context = useBettingContext()
  
  return {
    bets: context.bets,
    addBet: context.addBet,
    removeBet: context.removeBet,
    updateBetStake: context.updateBetStake,
    clearBets: context.clearBets,
    betSlipMode: context.betSlipMode,
    setBetSlipMode: context.setBetSlipMode,
    rightPanelTab: context.rightPanelTab,
    setRightPanelTab: context.setRightPanelTab,
  }
}

/**
 * Navigation State Hook
 * Abstracts sport/league selection
 */
export function useNavigation() {
  return useNavigationContext()
}

/**
 * Workspace Hook
 * Abstracts workspace view management
 */
export function useWorkspace() {
  const context = useBettingContext()
  
  return {
    activeView: context.activeView,
    setActiveView: context.setActiveView,
  }
}

/**
 * Panel Visibility Hook for Desktop
 * Manages panel show/hide states
 */
export function usePanelVisibility() {
  // This could be moved to a separate context if needed
  // For now, we'll use local state in App.tsx
  return {
    // Will be implemented in App.tsx refactor
  }
}

/**
 * Betting Utilities Hook
 * Common betting calculations and utilities
 */
export function useBettingUtils() {
  const calculatePayout = (stake: number, odds: number): number => {
    if (!stake || !odds) return 0
    
    if (odds > 0) {
      return stake * (odds / 100)
    } else {
      return stake * (100 / Math.abs(odds))
    }
  }

  const calculateParlayOdds = (bets: Bet[]): number => {
    if (bets.length < 2) return 0
    
    let combinedDecimal = 1
    bets.forEach(bet => {
      const decimal = bet.odds > 0 ? (bet.odds / 100) + 1 : (100 / Math.abs(bet.odds)) + 1
      combinedDecimal *= decimal
    })
    
    return combinedDecimal > 2 ? Math.round((combinedDecimal - 1) * 100) : -(100 / (combinedDecimal - 1))
  }

  const formatOdds = (odds: number): string => {
    return odds > 0 ? `+${odds}` : odds.toString()
  }

  const formatLine = (bet: Bet): string => {
    if (bet.betType === 'spread') {
      return `${bet.line > 0 ? '+' : ''}${bet.line}`
    } else if (bet.betType === 'total') {
      return `${bet.isOver ? 'O' : 'U'} ${bet.line}`
    }
    return ''
  }

  return {
    calculatePayout,
    calculateParlayOdds,
    formatOdds,
    formatLine,
  }
}