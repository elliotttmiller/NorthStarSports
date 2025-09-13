/**
 * Centralized Type System - Single Source of Truth
 * All data shapes and interfaces for the NorthStarSports application
 */

// Core Betting Types
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

// Game and League Types
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

// Sports Navigation Types
export interface Sport {
  id: string
  name: string
  leagues: League[]
}

// UI State Types
export type ViewType = 'games' | 'props'
export type BetSlipMode = 'straight' | 'parlay'
export type RightPanelTab = 'betslip' | 'mybets'
export type MobilePanelType = 'sports' | 'betslip' | null

// Context and Hook Types
export interface BettingContextType {
  bets: Bet[]
  addBet: (bet: Bet) => void
  removeBet: (betId: string) => void
  updateBetStake: (betId: string, stake: number) => void
  clearBets: () => void
  selectedSport: string
  selectedLeague: string
  setSelectedSport: (sport: string) => void
  setSelectedLeague: (league: string) => void
  activeView: ViewType
  setActiveView: (view: ViewType) => void
  favorites: string[]
  toggleFavorite: (leagueId: string) => void
  betSlipMode: BetSlipMode
  setBetSlipMode: (mode: BetSlipMode) => void
  rightPanelTab: RightPanelTab
  setRightPanelTab: (tab: RightPanelTab) => void
}

export interface NavigationContextType {
  selectedSport: string
  selectedLeague: string
  setSelectedSport: (sport: string) => void
  setSelectedLeague: (league: string) => void
  favorites: string[]
  toggleFavorite: (leagueId: string) => void
}

// Component Props Types
export interface PanelProps {
  isMobile?: boolean
  onToggleLeftPanel?: () => void
  onToggleRightPanel?: () => void
}

export interface MobileOverlayProps {
  isOpen: boolean
  onClose: () => void
  side: 'left' | 'right'
  children: React.ReactNode
}

export interface AccordionItemProps {
  title: string
  children: React.ReactNode
  isExpanded?: boolean
  onToggle?: () => void
}

export interface GameRowProps {
  game: Game
  onBetClick: (bet: Omit<Bet, 'id'>) => void
}

export interface BetSlipEntryProps {
  bet: Bet
  onRemove: (betId: string) => void
  onStakeChange: (betId: string, stake: number) => void
}

// Animation and Transition Types
export interface AnimationProps {
  initial?: object
  animate?: object
  exit?: object
  transition?: object
}

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type AtomicComponent<T = {}> = React.FC<T & React.HTMLAttributes<HTMLElement>>