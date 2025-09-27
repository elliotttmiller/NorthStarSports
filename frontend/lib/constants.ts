export const SITE_CONFIG = {
  name: 'NorthStar Sports',
  description: 'Professional sports betting platform with live odds and comprehensive betting options',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://northstar-sports.com',
  ogImage: 'https://northstar-sports.com/og.jpg',
  links: {
    twitter: 'https://twitter.com/northstarsports',
    github: 'https://github.com/northstarsports',
  },
  buildInfo: {
    buildId: globalThis.__BUILD_ID__ || 'unknown',
    isDev: globalThis.__DEV__ || false,
  },
} as const

export const SPORTS_LEAGUES = [
  { id: 'nfl', name: 'NFL', fullName: 'National Football League' },
  { id: 'nba', name: 'NBA', fullName: 'National Basketball Association' },
  { id: 'mlb', name: 'MLB', fullName: 'Major League Baseball' },
  { id: 'nhl', name: 'NHL', fullName: 'National Hockey League' },
  { id: 'ncaaf', name: 'NCAAF', fullName: 'College Football' },
  { id: 'ncaab', name: 'NCAAB', fullName: 'College Basketball' },
] as const

export const BET_TYPES = {
  SPREAD: 'spread',
  MONEYLINE: 'moneyline', 
  TOTAL: 'total',
} as const

export const GAME_STATUS = {
  SCHEDULED: 'scheduled',
  LIVE: 'live',
  FINAL: 'final',
  POSTPONED: 'postponed',
  CANCELLED: 'cancelled',
} as const

// Cache configurations
export const CACHE_CONFIG = {
  DEFAULT_REVALIDATE: 60, // 1 minute
  STATIC_REVALIDATE: 3600, // 1 hour
  DYNAMIC_REVALIDATE: 30, // 30 seconds
} as const