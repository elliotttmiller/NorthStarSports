import type { Game, Team, Sport, League, GameOdds, OddsData } from '@/types'

// Teams database - centralized team data with professional records
export const TEAMS: Record<string, Team> = {
  // NFL Teams
  chiefs: { 
    id: 'chiefs', 
    name: 'Kansas City Chiefs', 
    shortName: 'KC', 
    logo: '/assets/images/chiefs.svg', 
    record: '11-1' 
  },
  bills: { 
    id: 'bills', 
    name: 'Buffalo Bills', 
    shortName: 'BUF', 
    logo: '/assets/images/bills.svg', 
    record: '10-2' 
  },
  dolphins: { 
    id: 'dolphins', 
    name: 'Miami Dolphins', 
    shortName: 'MIA', 
    logo: '/assets/images/dolphins.svg', 
    record: '8-4' 
  },
  ravens: { 
    id: 'ravens', 
    name: 'Baltimore Ravens', 
    shortName: 'BAL', 
    logo: '/assets/images/ravens.svg', 
    record: '9-3' 
  },
  bengals: { 
    id: 'bengals', 
    name: 'Cincinnati Bengals', 
    shortName: 'CIN', 
    logo: '/assets/images/bengals.svg', 
    record: '7-5' 
  },
  steelers: { 
    id: 'steelers', 
    name: 'Pittsburgh Steelers', 
    shortName: 'PIT', 
    logo: '/assets/images/steelers.svg', 
    record: '8-4' 
  },
  
  // NBA Teams
  lakers: { 
    id: 'lakers', 
    name: 'Los Angeles Lakers', 
    shortName: 'LAL', 
    logo: '/assets/images/lakers.svg', 
    record: '15-10' 
  },
  celtics: { 
    id: 'celtics', 
    name: 'Boston Celtics', 
    shortName: 'BOS', 
    logo: '/assets/images/celtics.svg', 
    record: '18-7' 
  },
  warriors: { 
    id: 'warriors', 
    name: 'Golden State Warriors', 
    shortName: 'GSW', 
    logo: '/assets/images/warriors.svg', 
    record: '12-13' 
  },
  nuggets: { 
    id: 'nuggets', 
    name: 'Denver Nuggets', 
    shortName: 'DEN', 
    logo: '/assets/images/nuggets.svg', 
    record: '14-11' 
  },
  heat: { 
    id: 'heat', 
    name: 'Miami Heat', 
    shortName: 'MIA', 
    logo: '/assets/images/heat.svg', 
    record: '13-12' 
  },
  nets: { 
    id: 'nets', 
    name: 'Brooklyn Nets', 
    shortName: 'BKN', 
    logo: '/assets/images/nets.svg', 
    record: '11-14' 
  },
  
  // NHL Teams
  rangers: { 
    id: 'rangers', 
    name: 'New York Rangers', 
    shortName: 'NYR', 
    logo: '/assets/images/rangers.svg', 
    record: '15-8-1' 
  },
  bruins: { 
    id: 'bruins', 
    name: 'Boston Bruins', 
    shortName: 'BOS', 
    logo: '/assets/images/bruins.svg', 
    record: '13-10-3' 
  },
  panthers: { 
    id: 'panthers', 
    name: 'Florida Panthers', 
    shortName: 'FLA', 
    logo: '/assets/images/panthers.svg', 
    record: '16-9-1' 
  },
  oilers: { 
    id: 'oilers', 
    name: 'Edmonton Oilers', 
    shortName: 'EDM', 
    logo: '/assets/images/oilers.svg', 
    record: '16-10-2' 
  },
  
  // NCAAF Teams  
  alabama: { 
    id: 'alabama', 
    name: 'Alabama Crimson Tide', 
    shortName: 'ALA', 
    logo: '/assets/images/alabama.svg', 
    record: '10-2' 
  },
  georgia: { 
    id: 'georgia', 
    name: 'Georgia Bulldogs', 
    shortName: 'UGA', 
    logo: '/assets/images/georgia.svg', 
    record: '11-1' 
  },
  
  // NCAAB Teams
  duke: { 
    id: 'duke', 
    name: 'Duke Blue Devils', 
    shortName: 'DUKE', 
    logo: '/assets/images/duke.svg', 
    record: '12-3' 
  },
  unc: { 
    id: 'unc', 
    name: 'North Carolina Tar Heels', 
    shortName: 'UNC', 
    logo: '/assets/images/unc.svg', 
    record: '10-5' 
  }
}

// League configuration for proper odds generation
const LEAGUES = {
  NFL: {
    teams: ['chiefs', 'bills', 'dolphins', 'ravens', 'bengals', 'steelers'],
    hasQuarterWinners: true,
    hasHalfWinners: true,
    hasPeriodWinners: false
  },
  NBA: {
    teams: ['lakers', 'celtics', 'warriors', 'nuggets', 'heat', 'nets'],
    hasQuarterWinners: true,
    hasHalfWinners: true,
    hasPeriodWinners: false
  },
  NHL: {
    teams: ['rangers', 'bruins', 'panthers', 'oilers'],
    hasQuarterWinners: false,
    hasHalfWinners: false,
    hasPeriodWinners: true
  },
  NCAAF: {
    teams: ['alabama', 'georgia'],
    hasQuarterWinners: true,
    hasHalfWinners: true,
    hasPeriodWinners: false
  },
  NCAAB: {
    teams: ['duke', 'unc'],
    hasQuarterWinners: false,
    hasHalfWinners: true,
    hasPeriodWinners: false
  }
}

// Generate professional odds data
const generateOddsData = (odds: number, line?: number): OddsData => ({
  odds,
  line,
  lastUpdated: new Date()
})

// Generate comprehensive game odds matching professional GameCard expectations
const generateGameOdds = (leagueConfig: typeof LEAGUES[keyof typeof LEAGUES]): GameOdds => {
  const spreadLine = Math.random() > 0.5 ? 
    Math.floor(Math.random() * 14) + 1 : 
    -(Math.floor(Math.random() * 14) + 1)
  
  const totalLine = 45.5 + Math.floor(Math.random() * 20)
  
  const gameOdds: GameOdds = {
    spread: {
      home: generateOddsData(-110, -spreadLine),
      away: generateOddsData(-110, spreadLine)
    },
    moneyline: {
      home: generateOddsData(spreadLine < 0 ? -150 - Math.floor(Math.random() * 100) : 120 + Math.floor(Math.random() * 80)),
      away: generateOddsData(spreadLine > 0 ? -150 - Math.floor(Math.random() * 100) : 120 + Math.floor(Math.random() * 80))
    },
    total: {
      home: generateOddsData(-110),
      away: generateOddsData(-110),
      over: generateOddsData(-110, totalLine),
      under: generateOddsData(-110, totalLine)
    }
  }
  
  // Add period winners for NHL
  if (leagueConfig.hasPeriodWinners) {
    gameOdds.periodWinners = {
      '1st': generateOddsData(-110),
      '2nd': generateOddsData(-110), 
      '3rd': generateOddsData(-110)
    }
  }
  
  // Add quarter winners for NFL, NBA, NCAAF
  if (leagueConfig.hasQuarterWinners) {
    gameOdds.quarterWinners = {
      '1st': generateOddsData(-110),
      '2nd': generateOddsData(-110),
      '3rd': generateOddsData(-110),
      '4th': generateOddsData(-110)
    }
  }
  
  // Add half winners
  if (leagueConfig.hasHalfWinners) {
    gameOdds.halfWinners = {
      '1st': generateOddsData(-110),
      '2nd': generateOddsData(-110)
    }
  }
  
  return gameOdds
}

// Generate professional game matching exact type structure
const generateGame = (
  id: string,
  leagueId: keyof typeof LEAGUES,
  homeTeamId: keyof typeof TEAMS,
  awayTeamId: keyof typeof TEAMS,
  hoursOffset: number = 0,
  status: 'upcoming' | 'live' | 'finished' = 'upcoming'
): Game => {
  const config = LEAGUES[leagueId]
  const startTime = new Date()
  startTime.setHours(startTime.getHours() + hoursOffset)
  
  return {
    id,
    leagueId,
    homeTeam: TEAMS[homeTeamId],
    awayTeam: TEAMS[awayTeamId],
    startTime,
    status,
    odds: generateGameOdds(config),
    venue: `${TEAMS[homeTeamId].name} Stadium`
  }
}

// Professional trending games that will display beautifully
export const mockTrendingGames: Game[] = [
  generateGame('trending-1', 'NBA', 'lakers', 'warriors', 1, 'live'),
  generateGame('trending-2', 'NFL', 'chiefs', 'bills', 2, 'upcoming'),
  generateGame('trending-3', 'NHL', 'rangers', 'bruins', 0.5, 'live'),
]

// Generate games for specific leagues
export const generateGamesForLeague = (leagueId: keyof typeof LEAGUES, count: number = 6): Game[] => {
  const config = LEAGUES[leagueId]
  const games: Game[] = []
  
  for (let i = 0; i < count; i++) {
    const teams = config.teams
    const homeTeam = teams[Math.floor(Math.random() * teams.length)]
    let awayTeam = teams[Math.floor(Math.random() * teams.length)]
    
    // Ensure different teams
    while (awayTeam === homeTeam) {
      awayTeam = teams[Math.floor(Math.random() * teams.length)]
    }
    
    const hoursOffset = Math.floor(Math.random() * 48) - 24 // Games from 24h ago to 24h from now
    const status = hoursOffset < -2 ? 'finished' : hoursOffset < 2 ? 'live' : 'upcoming'
    
    games.push(generateGame(
      `${leagueId.toLowerCase()}-${i + 1}`,
      leagueId,
      homeTeam as keyof typeof TEAMS,
      awayTeam as keyof typeof TEAMS,
      hoursOffset,
      status
    ))
  }
  
  return games
}

// All games across all leagues
export const mockAllGames: Game[] = [
  ...mockTrendingGames,
  ...generateGamesForLeague('NFL', 8),
  ...generateGamesForLeague('NBA', 12),
  ...generateGamesForLeague('NHL', 6),
  ...generateGamesForLeague('NCAAF', 4),
  ...generateGamesForLeague('NCAAB', 6)
]

// Professional sports structure
export const mockSports: Sport[] = [
  {
    id: 'football',
    name: 'Football',
    icon: '🏈',
    leagues: [
      {
        id: 'nfl',
        name: 'NFL',
        sportId: 'football',
        games: generateGamesForLeague('NFL', 10)
      },
      {
        id: 'ncaaf',
        name: 'College Football',
        sportId: 'football',
        games: generateGamesForLeague('NCAAF', 6)
      }
    ]
  },
  {
    id: 'basketball',
    name: 'Basketball',
    icon: '🏀',
    leagues: [
      {
        id: 'nba',
        name: 'NBA',
        sportId: 'basketball',
        games: generateGamesForLeague('NBA', 15)
      },
      {
        id: 'ncaab',
        name: 'College Basketball',
        sportId: 'basketball',
        games: generateGamesForLeague('NCAAB', 8)
      }
    ]
  },
  {
    id: 'hockey',
    name: 'Hockey',
    icon: '🏒',
    leagues: [
      {
        id: 'nhl',
        name: 'NHL',
        sportId: 'hockey',
        games: generateGamesForLeague('NHL', 8)
      }
    ]
  }
]
