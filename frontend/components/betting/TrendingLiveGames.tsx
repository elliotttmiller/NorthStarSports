'use client'

import GameCard from './GameCard'

// Mock data for demonstration
const mockGames = [
	{
		id: '1',
		homeTeam: { name: 'Chiefs', score: 21, logo: '/logos/chiefs.svg' },
		awayTeam: { name: 'Bills', score: 14, logo: '/logos/bills.svg' },
		startTime: new Date(Date.now() + 60 * 60 * 1000),
		odds: {
			spread: { home: -3.5, away: 3.5, odds: -110 },
			moneyline: { home: -150, away: 130 },
			total: { line: 47.5, odds: -110 },
		},
		details: {
			league: 'NFL',
			status: 'live',
			venue: 'Stadium Name',
		},
	},
	{
		id: '2',
		homeTeam: { name: 'Lakers', score: 95, logo: '/logos/lakers.svg' },
		awayTeam: { name: 'Warriors', score: 88, logo: '/logos/warriors.svg' },
		startTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
		odds: {
			spread: { home: -2.5, away: 2.5, odds: -110 },
			moneyline: { home: -120, away: 100 },
			total: { line: 225.5, odds: -110 },
		},
		details: {
			league: 'NBA',
			status: 'live',
			venue: 'Arena Name',
		},
	},
	{
		id: '3',
		homeTeam: { name: 'Cowboys', score: 0, logo: '/logos/cowboys.svg' },
		awayTeam: { name: 'Giants', score: 0, logo: '/logos/giants.svg' },
		startTime: new Date(Date.now() + 3 * 60 * 60 * 1000),
		odds: {
			spread: { home: -7.5, away: 7.5, odds: -110 },
			moneyline: { home: -300, away: 250 },
			total: { line: 42.5, odds: -110 },
		},
		details: {
			league: 'NFL',
			status: 'scheduled',
			venue: 'Stadium Name',
		},
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