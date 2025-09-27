export interface Team {
  name: string
  score: number
  logo: string
}

export interface GameOdds {
  spread: {
    home: number
    away: number
    odds: number
  }
  total: {
    line: number
    odds: number
  }
  moneyline: {
    home: number
    away: number
  }
}

export interface GameDetails {
  status: string
  venue: string
  league: string
}

export interface Game {
  id: string
  homeTeam: Team
  awayTeam: Team
  startTime: Date
  odds: GameOdds
  details: GameDetails
}

export interface BetSelection {
  id: string
  gameId: string
  market: 'spread' | 'total' | 'moneyline'
  team: string
  point?: number
  odds: number
  gameDetails: {
    homeTeam: string
    awayTeam: string
  }
}