import { League, Game } from '@/contexts/BettingContext'

export const sampleGames: Game[] = [
  {
    id: 'patriots-dolphins',
    homeTeam: 'Dolphins',
    awayTeam: 'Patriots',
    time: '1:00 PM',
    homeSpread: -1.5,
    awaySpread: 1.5,
    homeSpreadOdds: -115,
    awaySpreadOdds: -105,
    total: 43.5,
    overOdds: -110,
    underOdds: -110,
    homeMoneyline: -130,
    awayMoneyline: 110
  },
  {
    id: 'jaguars-bengals',
    homeTeam: 'Bengals',
    awayTeam: 'Jaguars',
    time: '1:00 PM',
    homeSpread: -3.5,
    awaySpread: 3.5,
    homeSpreadOdds: -105,
    awaySpreadOdds: -115,
    total: 49.5,
    overOdds: -110,
    underOdds: -110,
    homeMoneyline: -185,
    awayMoneyline: 155
  },
  {
    id: 'browns-ravens',
    homeTeam: 'Ravens',
    awayTeam: 'Browns',
    time: '1:00 PM',
    homeSpread: -11.5,
    awaySpread: 11.5,
    homeSpreadOdds: -110,
    awaySpreadOdds: -110,
    total: 45.5,
    overOdds: -110,
    underOdds: -110,
    homeMoneyline: -595,
    awayMoneyline: 435
  },
  {
    id: 'giants-cowboys',
    homeTeam: 'Cowboys',
    awayTeam: 'Giants',
    time: '1:00 PM',
    homeSpread: -5.5,
    awaySpread: 5.5,
    homeSpreadOdds: -110,
    awaySpreadOdds: -110,
    total: 44.5,
    overOdds: -110,
    underOdds: -110,
    homeMoneyline: -245,
    awayMoneyline: 205
  },
  {
    id: 'rams-titans',
    homeTeam: 'Titans',
    awayTeam: 'Rams',
    time: '1:00 PM',
    homeSpread: -5.5,
    awaySpread: 5.5,
    homeSpreadOdds: -110,
    awaySpreadOdds: -110,
    total: 41.5,
    overOdds: -105,
    underOdds: -115,
    homeMoneyline: -250,
    awayMoneyline: 210
  },
  {
    id: 'bills-jets',
    homeTeam: 'Jets',
    awayTeam: 'Bills',
    time: '1:00 PM',
    homeSpread: 6.5,
    awaySpread: -6.5,
    homeSpreadOdds: -120,
    awaySpreadOdds: 100,
    total: 42.5,
    overOdds: -115,
    underOdds: -105,
    homeMoneyline: 230,
    awayMoneyline: -280
  },
  {
    id: 'bears-lions',
    homeTeam: 'Lions',
    awayTeam: 'Bears',
    time: '1:00 PM',
    homeSpread: -6.5,
    awaySpread: 6.5,
    homeSpreadOdds: -110,
    awaySpreadOdds: -110,
    total: 46.5,
    overOdds: -110,
    underOdds: -110,
    homeMoneyline: -270,
    awayMoneyline: 220
  },
  {
    id: 'seahawks-49ers',
    homeTeam: '49ers',
    awayTeam: 'Seahawks',
    time: '1:00 PM',
    homeSpread: 3.5,
    awaySpread: -3.5,
    homeSpreadOdds: -110,
    awaySpreadOdds: -110,
    total: 40.5,
    overOdds: -110,
    underOdds: -110,
    homeMoneyline: 140,
    awayMoneyline: -160
  }
]

export const sampleLeagues: League[] = [
  {
    id: 'nfl',
    name: 'NFL',
    sport: 'Football',
    games: sampleGames
  },
  {
    id: 'college-football',
    name: 'College Football',
    sport: 'Football', 
    games: []
  },
  {
    id: 'nba',
    name: 'NBA',
    sport: 'Basketball',
    games: []
  },
  {
    id: 'college-basketball',
    name: 'College Basketball',
    sport: 'Basketball',
    games: []
  },
  {
    id: 'mlb',
    name: 'MLB',
    sport: 'Baseball',
    games: []
  },
  {
    id: 'nhl',
    name: 'NHL',
    sport: 'Hockey',
    games: []
  },
  {
    id: 'soccer',
    name: 'Soccer',
    sport: 'Soccer',
    games: []
  },
  {
    id: 'tennis',
    name: 'Tennis',
    sport: 'Tennis',
    games: []
  },
  {
    id: 'golf',
    name: 'Golf',
    sport: 'Golf',
    games: []
  },
  {
    id: 'mma',
    name: 'MMA/Fighting',
    sport: 'Fighting',
    games: []
  },
  {
    id: 'motor-racing',
    name: 'Motor Racing',
    sport: 'Racing',
    games: []
  }
]

export const sportCategories = [
  {
    name: 'Football',
    leagues: ['nfl', 'college-football']
  },
  {
    name: 'Basketball', 
    leagues: ['nba', 'college-basketball']
  },
  {
    name: 'Baseball',
    leagues: ['mlb']
  },
  {
    name: 'Hockey',
    leagues: ['nhl']
  },
  {
    name: 'Soccer',
    leagues: ['soccer']
  },
  {
    name: 'Tennis',
    leagues: ['tennis']
  },
  {
    name: 'Golf',
    leagues: ['golf']
  },
  {
    name: 'Fighting',
    leagues: ['mma']
  },
  {
    name: 'Racing',
    leagues: ['motor-racing']
  }
]