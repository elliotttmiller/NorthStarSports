'use client'

import GameCard from './GameCard'

// Mock data for demonstration
const mockGames = [
	{
		id: '1',
		homeTeam: 'Chiefs',
		awayTeam: 'Bills',
		homeScore: 21,
		awayScore: 14,
		startTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
		league: 'NFL',
		spread: { home: -3.5, away: 3.5, odds: -110 },
		moneyline: { home: -150, away: 130 },
		total: { over: 47.5, under: 47.5, odds: -110 },
		status: 'live' as const,
	},
	{
		id: '2',
		homeTeam: 'Lakers',
		awayTeam: 'Warriors',
		homeScore: 95,
		awayScore: 88,
		startTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
		league: 'NBA',
		spread: { home: -2.5, away: 2.5, odds: -110 },
		moneyline: { home: -120, away: 100 },
		total: { over: 225.5, under: 225.5, odds: -110 },
		status: 'live' as const,
	},
	{
		id: '3',
		homeTeam: 'Cowboys',
		awayTeam: 'Giants',
		homeScore: 0,
		awayScore: 0,
		startTime: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
		league: 'NFL',
		spread: { home: -7.5, away: 7.5, odds: -110 },
		moneyline: { home: -300, away: 250 },
		total: { over: 42.5, under: 42.5, odds: -110 },
		status: 'scheduled' as const,
	},
]

export default function TrendingLiveGames() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{mockGames.map((game) => (
				<GameCard key={game.id} game={game} />
			))}
		</div>
	)
}