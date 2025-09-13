import { createContext, useContext, ReactNode } from 'react'
import { useKV } from '@github/spark/hooks'

export interface Bet {
  id: string
  gameId: string
  teamName: string
  betType: 'spread' | 'moneyline' | 'total'
  odds: number
  line?: number
  stake?: number
  isOver?: boolean
}

export interface Game {
  id: string
  homeTeam: string
  awayTeam: string
  time: string
  homeSpread: number
  awaySpread: number
  homeSpreadOdds: number
  awaySpreadOdds: number
  total: number
  overOdds: number
  underOdds: number
  homeMoneyline: number
  awayMoneyline: number
}

export interface League {
  id: string
  name: string
  sport: string
  games: Game[]
}

interface BettingContextType {
  bets: Bet[]
  addBet: (bet: Bet) => void
  removeBet: (betId: string) => void
  updateBetStake: (betId: string, stake: number) => void
  clearBets: () => void
  selectedSport: string
  selectedLeague: string
  setSelectedSport: (sport: string) => void
  setSelectedLeague: (league: string) => void
  activeView: 'games' | 'props'
  setActiveView: (view: 'games' | 'props') => void
  favorites: string[]
  toggleFavorite: (leagueId: string) => void
  betSlipMode: 'straight' | 'parlay'
  setBetSlipMode: (mode: 'straight' | 'parlay') => void
  rightPanelTab: 'betslip' | 'mybets'
  setRightPanelTab: (tab: 'betslip' | 'mybets') => void
}

const BettingContext = createContext<BettingContextType | null>(null)

export function BettingProvider({ children }: { children: ReactNode }) {
  const [bets, setBets] = useKV<Bet[]>('betting-slip', [])
  const [favorites, setFavorites] = useKV<string[]>('favorites', [])
  const [selectedSport, setSelectedSport] = useKV<string>('selected-sport', 'Football')
  const [selectedLeague, setSelectedLeague] = useKV<string>('selected-league', 'nfl')
  const [activeView, setActiveView] = useKV<'games' | 'props'>('active-view', 'games')
  const [betSlipMode, setBetSlipMode] = useKV<'straight' | 'parlay'>('betslip-mode', 'straight')
  const [rightPanelTab, setRightPanelTab] = useKV<'betslip' | 'mybets'>('right-panel-tab', 'betslip')

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