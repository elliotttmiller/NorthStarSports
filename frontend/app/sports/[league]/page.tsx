'use client'

import { useUIStore } from '@/store/ui-state'
import StatCard from '@/components/dashboard/StatCard'
import GamesTable from '@/components/betting/GamesTable'
import MobileGameCard from '@/components/mobile/MobileGameCard'
import { cn } from '@/lib/utils'
import { notFound } from 'next/navigation'

interface LeaguePageProps {
  params: {
    league: string
  }
}

const leagueData: Record<string, { name: string; fullName: string; week?: string; date: string }> = {
  'nfl': { name: 'NFL', fullName: 'National Football League', week: 'Week 12', date: 'November 24, 2024' },
  'nba': { name: 'NBA', fullName: 'National Basketball Association', date: 'November 24, 2024' },
  'mlb': { name: 'MLB', fullName: 'Major League Baseball', date: 'November 24, 2024' },
  'nhl': { name: 'NHL', fullName: 'National Hockey League', date: 'November 24, 2024' },
  'ncaaf': { name: 'NCAAF', fullName: 'College Football', week: 'Week 13', date: 'November 24, 2024' },
  'ncaab': { name: 'NCAAB', fullName: 'College Basketball', date: 'November 24, 2024' },
  'premier-league': { name: 'Premier League', fullName: 'English Premier League', date: 'November 24, 2024' },
  'la-liga': { name: 'La Liga', fullName: 'Spanish La Liga', date: 'November 24, 2024' },
}

const mockGames = [
  {
    id: 'nfl-1',
    startTime: new Date(new Date().setHours(13, 0, 0, 0)),
    homeTeam: { name: 'Kansas City Chiefs', score: 0, logo: '/logos/chiefs.svg' },
    awayTeam: { name: 'Buffalo Bills', score: 0, logo: '/logos/bills.svg' },
    odds: {
      spread: { home: -7.5, away: 7.5, odds: -110 },
      total: { line: 52.5, odds: -110 },
      moneyline: { home: -350, away: 280 },
    },
    details: {
      status: 'Upcoming',
      venue: 'Arrowhead Stadium',
      league: 'NFL',
    },
  },
  {
    id: 'nfl-2',
    startTime: new Date(new Date().setHours(16, 25, 0, 0)),
    homeTeam: { name: 'Dallas Cowboys', score: 0, logo: '/logos/cowboys.svg' },
    awayTeam: { name: 'Philadelphia Eagles', score: 0, logo: '/logos/eagles.svg' },
    odds: {
      spread: { home: -3, away: 3, odds: -110 },
      total: { line: 48.5, odds: -110 },
      moneyline: { home: -150, away: 130 },
    },
    details: {
      status: 'Upcoming',
      venue: 'AT&T Stadium',
      league: 'NFL',
    },
  },
]

export default function LeaguePage({ params }: LeaguePageProps) {
  const { isSportsOpen, isBetSlipOpen } = useUIStore()
  const league = leagueData[params.league]

  if (!league) {
    notFound()
  }

  const getContentMargins = () => {
    let leftMargin = 'ml-0'
    let rightMargin = 'mr-0'
    
    if (isSportsOpen) leftMargin = 'ml-[280px]'
    if (isBetSlipOpen) rightMargin = 'mr-[320px]'
    
    return `${leftMargin} ${rightMargin}`
  }

  return (
    <>
      {/* Desktop Layout */}
      <div className={cn('hidden md:block transition-all duration-300 ease-in-out', getContentMargins())}>
        <div className="p-6 space-y-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Balance" value="$1,250.75" />
            <StatCard title="Win Rate" value="58.2%" />
            <StatCard title="Active Bets" value="12" />
            <StatCard title="This Week" value="+$284.50" />
          </div>

          {/* League Header */}
          <div className="bg-ns-green/10 border border-ns-green/20 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-ns-green/20 rounded-full" />
              <div>
                <h1 className="text-xl font-bold text-ns-light">{league.name}</h1>
                <p className="text-xs text-ns-muted">
                  {league.week ? `${league.week} - ` : ''}{league.date}
                </p>
              </div>
            </div>
          </div>

          {/* Games Table */}
          <GamesTable />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="p-4 space-y-6">
          {/* League Header */}
          <div className="bg-ns-green/10 border border-ns-green/20 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-ns-green/20 rounded-full" />
              <div>
                <h1 className="text-xl font-bold text-ns-light">{league.name}</h1>
                <p className="text-xs text-ns-muted">
                  {league.week ? `${league.week} - ` : ''}{league.date}
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Games List */}
          <div className="space-y-4">
            {mockGames.map((game) => (
              <MobileGameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}