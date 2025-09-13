/**
 * Custom Hooks for Decoupled State Management
 * Following the Protocol of Decoupled Logic
 */

import { useBetting as useBettingContext } from '@/contexts/BettingContext'
import { useCallback, useMemo, useEffect, useState } from 'react'
import type { Bet } from '@/types'

/**
 * Media Query Hook
 * Responsive design utilities
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    
    const updateMatches = () => {
      setMatches(media.matches)
    }

    updateMatches()
    media.addEventListener('change', updateMatches)
    
    return () => media.removeEventListener('change', updateMatches)
  }, [query])

  return matches
}

/**
 * Responsive Utilities Hook
 * Pre-configured breakpoint hooks
 */
export function useResponsive() {
  const isMobile = useMediaQuery('(max-width: 1023px)')
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const isLargeDesktop = useMediaQuery('(min-width: 1440px)')
  
  return { isMobile, isTablet, isDesktop, isLargeDesktop }
}

/**
 * Unified Application State Hook
 * Single source of truth for all app state
 */
export function useAppState() {
  return useBettingContext()
}

/**
 * Bet Slip Management Hook
 * Abstracts all bet-related operations with performance optimizations
 */
export function useBetSlip() {
  const context = useBettingContext()
  
  // Memoize bet statistics for performance
  const betStats = useMemo(() => ({
    totalBets: context.bets.length,
    totalStake: context.bets.reduce((sum, bet) => sum + (bet.stake || 0), 0),
    hasValidBets: context.bets.some(bet => bet.stake && bet.stake > 0),
  }), [context.bets])
  
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
    ...betStats,
  }
}

/**
 * Navigation State Hook
 * Abstracts sport/league selection with optimized updates
 */
export function useNavigation() {
  const context = useBettingContext()
  
  return {
    selectedSport: context.selectedSport,
    selectedLeague: context.selectedLeague,
    setSelectedSport: context.setSelectedSport,
    setSelectedLeague: context.setSelectedLeague,
    favorites: context.favorites,
    toggleFavorite: context.toggleFavorite,
  }
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
 * Betting Utilities Hook
 * Common betting calculations and utilities with memoization
 */
export function useBettingUtils() {
  const calculatePayout = useCallback((stake: number, odds: number): number => {
    if (!stake || !odds) return 0
    
    if (odds > 0) {
      return stake * (odds / 100)
    } else {
      return stake * (100 / Math.abs(odds))
    }
  }, [])

  const calculateParlayOdds = useCallback((bets: Bet[]): number => {
    if (bets.length < 2) return 0
    
    let combinedDecimal = 1
    bets.forEach(bet => {
      const decimal = bet.odds > 0 ? (bet.odds / 100) + 1 : (100 / Math.abs(bet.odds)) + 1
      combinedDecimal *= decimal
    })
    
    return combinedDecimal > 2 ? Math.round((combinedDecimal - 1) * 100) : -(100 / (combinedDecimal - 1))
  }, [])

  const formatOdds = useCallback((odds: number): string => {
    return odds > 0 ? `+${odds}` : odds.toString()
  }, [])

  const formatLine = useCallback((bet: Bet): string => {
    if (bet.betType === 'spread') {
      return `${bet.line > 0 ? '+' : ''}${bet.line}`
    } else if (bet.betType === 'total') {
      return `${bet.isOver ? 'O' : 'U'} ${bet.line}`
    }
    return ''
  }, [])

  const calculateTotalPayout = useCallback((bets: Bet[]): number => {
    if (bets.length === 0) return 0
    
    if (bets.length === 1) {
      const bet = bets[0]
      return bet.stake ? calculatePayout(bet.stake, bet.odds) : 0
    }
    
    // Parlay calculation
    const totalStake = bets.reduce((sum, bet) => sum + (bet.stake || 0), 0)
    const parlayOdds = calculateParlayOdds(bets)
    return parlayOdds ? calculatePayout(totalStake, parlayOdds) : 0
  }, [calculatePayout, calculateParlayOdds])

  return {
    calculatePayout,
    calculateParlayOdds,
    formatOdds,
    formatLine,
    calculateTotalPayout,
  }
}