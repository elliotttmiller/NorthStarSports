import GameCard from '@/components/betting/GameCard'

const featuredGames = [
  {
    id: '1',
    homeTeam: 'Dallas Cowboys',
    awayTeam: 'Philadelphia Eagles',
    homeScore: null,
    awayScore: null,
    startTime: '2024-01-15T20:00:00Z',
    league: 'NFL',
    spread: { home: -3.5, away: 3.5, odds: -110 },
    moneyline: { home: -180, away: +150 },
    total: { over: 47.5, under: 47.5, odds: -110 },
    status: 'scheduled' as const,
  },
  {
    id: '2', 
    homeTeam: 'Los Angeles Lakers',
    awayTeam: 'Boston Celtics',
    homeScore: 98,
    awayScore: 102,
    startTime: '2024-01-15T22:00:00Z',
    league: 'NBA',
    spread: { home: -2.5, away: 2.5, odds: -105 },
    moneyline: { home: -125, away: +105 },
    total: { over: 215.5, under: 215.5, odds: -108 },
    status: 'live' as const,
  },
  {
    id: '3',
    homeTeam: 'New York Yankees',
    awayTeam: 'Houston Astros',
    homeScore: 7,
    awayScore: 4,
    startTime: '2024-01-15T19:00:00Z',
    league: 'MLB',
    spread: { home: -1.5, away: 1.5, odds: -120 },
    moneyline: { home: -160, away: +140 },
    total: { over: 8.5, under: 8.5, odds: -115 },
    status: 'final' as const,
  },
]

export default function FeaturedGames() {
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-fluid-4xl font-bold mb-fluid-xl text-center">
        Featured Games
      </h2>
      
      <p className="text-fluid-lg text-ns-muted text-center mb-fluid-2xl line-clamp-2">
        Don't miss these high-stakes matchups with the best odds and live betting opportunities available right now.
      </p>
      
      {/* Container query responsive grid */}
      <div className="@container">
        <div className="grid grid-cols-1 @lg:grid-cols-2 @4xl:grid-cols-3 gap-fluid-lg">
          {featuredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </div>
  )
}