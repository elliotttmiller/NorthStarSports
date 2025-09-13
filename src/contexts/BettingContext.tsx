import { createContext, useContext, ReactNode } from 'react'
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

export function BettingProvider({ children }: { children: ReactNode }) {
  const [bets, setBets] = useKV<Bet[]>('betting-slip', [])
  const [favorites, setFavorites] = useKV<string[]>('favorites', [])
  const [selectedSport, setSelectedSport] = useKV<string>('selected-sport', 'Football')
  const [selectedLeague, setSelectedLeague] = useKV<string>('selected-league', 'nfl')
  const [activeView, setActiveView] = useKV<ViewType>('active-view', 'games')
  const [betSlipMode, setBetSlipMode] = useKV<BetSlipMode>('betslip-mode', 'straight')
  const [rightPanelTab, setRightPanelTab] = useKV<RightPanelTab>('right-panel-tab', 'betslip')

  const addBet = (bet: Bet) => {
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
  }

  const removeBet = (betId: string) => {
    setBets(currentBets => currentBets?.filter(bet => bet.id !== betId) || [])
  }

  const updateBetStake = (betId: string, stake: number) => {
    setBets(currentBets => 
      currentBets?.map(bet => 
        bet.id === betId ? { ...bet, stake } : bet
      ) || []
    )
  }

  const clearBets = () => {
    setBets([])
  }

  const toggleFavorite = (leagueId: string) => {
    setFavorites(currentFavorites => {
      if (!currentFavorites) return [leagueId]
      return currentFavorites.includes(leagueId)
        ? currentFavorites.filter(id => id !== leagueId)
        : [...currentFavorites, leagueId]
    })
  }

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