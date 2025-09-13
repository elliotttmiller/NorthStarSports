/**
 * Unified Betting Context - Single Source of Truth
 * Manages all application state including betting, navigation, and UI preferences
 * Replaces the previous separate NavigationContext for better architecture
 */

import { createContext, useContext, ReactNode, useCallback } from 'react'
import { useKV } from '@github/spark/hooks'
import type { 
  Bet, 
  Game, 
  League, 
  BettingContextType,
  ViewType,
  BetSlipMode,
  RightPanelTab
} from '@/types'

const BettingContext = createContext<BettingContextType | null>(null)

/**
 * BettingProvider - Main Application State Provider
 * Provides unified state management for the entire application
 */
export function BettingProvider({ children }: { children: ReactNode }) {
  const [bets, setBets] = useKV<Bet[]>('betting-slip', [])
  const [favorites, setFavorites] = useKV<string[]>('favorites', [])
  const [selectedSport, setSelectedSport] = useKV<string>('selected-sport', 'Football')
  const [selectedLeague, setSelectedLeague] = useKV<string>('selected-league', 'nfl')
  const [activeView, setActiveView] = useKV<ViewType>('active-view', 'games')
  const [betSlipMode, setBetSlipMode] = useKV<BetSlipMode>('betslip-mode', 'straight')
  const [rightPanelTab, setRightPanelTab] = useKV<RightPanelTab>('right-panel-tab', 'betslip')

  /**
   * Add a new bet to the bet slip
   * Replaces existing bet if same game/type/team combination exists
   */
  const addBet = useCallback((bet: Bet) => {
    setBets(currentBets => {
      if (!currentBets) return [bet]
      
      const existingBetIndex = currentBets.findIndex(b => 
        b.gameId === bet.gameId && b.betType === bet.betType && b.teamName === bet.teamName
      )
      
      if (existingBetIndex >= 0) {
        const updated = [...currentBets]
        updated[existingBetIndex] = bet
        return updated
      }
      
      return [...currentBets, bet]
    })
  }, [setBets])

  /** Remove a bet from the bet slip */
  const removeBet = useCallback((betId: string) => {
    setBets(currentBets => currentBets?.filter(bet => bet.id !== betId) || [])
  }, [setBets])

  /** Update the stake amount for a specific bet */
  const updateBetStake = useCallback((betId: string, stake: number) => {
    setBets(currentBets => 
      currentBets?.map(bet => 
        bet.id === betId ? { ...bet, stake } : bet
      ) || []
    )
  }, [setBets])

  /** Clear all bets from the bet slip */
  const clearBets = useCallback(() => {
    setBets([])
  }, [setBets])

  /** Toggle favorite status for a league */
  const toggleFavorite = useCallback((leagueId: string) => {
    setFavorites(currentFavorites => {
      if (!currentFavorites) return [leagueId]
      return currentFavorites.includes(leagueId)
        ? currentFavorites.filter(id => id !== leagueId)
        : [...currentFavorites, leagueId]
    })
  }, [setFavorites])

  return (
    <BettingContext.Provider
      value={{
        bets: bets || [],
        addBet,
        removeBet,
        updateBetStake,
        clearBets,
        selectedSport: selectedSport || 'Football',
        selectedLeague: selectedLeague || 'nfl',
        setSelectedSport,
        setSelectedLeague,
        activeView: activeView || 'games',
        setActiveView,
        favorites: favorites || [],
        toggleFavorite,
        betSlipMode: betSlipMode || 'straight',
        setBetSlipMode,
        rightPanelTab: rightPanelTab || 'betslip',
        setRightPanelTab
      }}
    >
      {children}
    </BettingContext.Provider>
  )
}

export function useBetting() {
  const context = useContext(BettingContext)
  if (!context) {
    throw new Error('useBetting must be used within a BettingProvider')
  }
  return context
}