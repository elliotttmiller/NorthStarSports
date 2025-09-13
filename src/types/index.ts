/**
 * Centralized Type System - Single Source of Truth
 * All data shapes and interfaces for the NorthStarSports application
 */

// ===== CORE BETTING TYPES =====
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

export interface Sport {
  id: string
  name: string
  leagues: League[]
}

// ===== UI STATE ENUMS =====
export type ViewType = 'games' | 'props'
export type BetSlipMode = 'straight' | 'parlay'
export type RightPanelTab = 'betslip' | 'mybets'
export type MobilePanelType = 'sports' | 'betslip' | null

// ===== CONTEXT INTERFACES =====
export interface BettingContextType {
  // Bet Management
  bets: Bet[]
  addBet: (bet: Bet) => void
  removeBet: (betId: string) => void
  updateBetStake: (betId: string, stake: number) => void
  clearBets: () => void
  
  // Navigation State
  selectedSport: string
  selectedLeague: string
  setSelectedSport: (sport: string) => void
  setSelectedLeague: (league: string) => void
  favorites: string[]
  toggleFavorite: (leagueId: string) => void
  
  // View Management
  activeView: ViewType
  setActiveView: (view: ViewType) => void
  betSlipMode: BetSlipMode
  setBetSlipMode: (mode: BetSlipMode) => void
  rightPanelTab: RightPanelTab
  setRightPanelTab: (tab: RightPanelTab) => void
}

// ===== COMPONENT PROP INTERFACES =====
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

// ===== ATOMIC COMPONENT INTERFACES =====
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

// ===== ANIMATION INTERFACES =====
export interface AnimationProps {
  initial?: object
  animate?: object
  exit?: object
  transition?: object
}

// ===== UTILITY TYPES =====
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type AtomicComponent<T = {}> = React.FC<T & React.HTMLAttributes<HTMLElement>>

// ===== RESPONSIVE TYPES =====
export interface ResponsiveState {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isLargeDesktop: boolean
}

// ===== BETTING CALCULATION TYPES =====
export interface BetCalculation {
  payout: number
  totalStake: number
  potentialWin: number
}

export interface ParlayCalculation extends BetCalculation {
  parlayOdds: number
  combinedDecimal: number
}