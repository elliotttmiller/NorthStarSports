'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { formatTime } from '@/lib/utils'
import OddsButton from './OddsButton'
import { BetSelection } from '@/store/bet-slip'
import { cn } from '@/lib/utils'

const mockGames = [
	{
		id: 'nfl-1',
		startTime: new Date(new Date().setHours(13, 0, 0, 0)),
		homeTeam: { name: 'Kansas City Chiefs', logo: '/kc.svg' },
		awayTeam: { name: 'Buffalo Bills', logo: '/buf.svg' },
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
		homeTeam: { name: 'Dallas Cowboys', logo: '/dal.svg' },
		awayTeam: { name: 'Philadelphia Eagles', logo: '/phi.svg' },
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

export default function GamesTable() {
	const [expandedGame, setExpandedGame] = useState<string | null>(null)

	interface Game {
		id: string
		startTime: Date
		homeTeam: { name: string; logo: string }
		awayTeam: { name: string; logo: string }
		odds: {
			spread: { home: number; away: number; odds: number }
			total: { line: number; odds: number }
			moneyline: { home: number; away: number }
		}
		details: {
			status: string
			venue: string
			league: string
		}
	}

	const createSelection = (
		game: Game,
		market: 'spread' | 'total' | 'moneyline',
		teamType: 'home' | 'away' | 'over' | 'under'
	): BetSelection => {
		const gameDetails = { homeTeam: game.homeTeam.name, awayTeam: game.awayTeam.name }
		let team: string, point: number, odds: number, idSuffix: string

		switch (market) {
			case 'spread':
				team = teamType === 'home' ? game.homeTeam.name : game.awayTeam.name
				point = teamType === 'home' ? game.odds.spread.home : game.odds.spread.away
				odds = game.odds.spread.odds
				idSuffix = `spread-${teamType}`
				break
			case 'total':
				team = teamType === 'over' ? 'Over' : 'Under'
				point = game.odds.total.line
				odds = game.odds.total.odds
				idSuffix = `total-${teamType}`
				break
			case 'moneyline':
				team = teamType === 'home' ? game.homeTeam.name : game.awayTeam.name
				point = 0 // Assign a default value for 'point' in moneyline
				odds = teamType === 'home' ? game.odds.moneyline.home : game.odds.moneyline.away
				idSuffix = `moneyline-${teamType}`
				break
		}

		return {
			id: `${game.id}-${idSuffix}`,
			gameId: game.id,
			market,
			team,
			point,
			odds,
			gameDetails,
		}
	}

	const toggleExpanded = (gameId: string) => {
		setExpandedGame(expandedGame === gameId ? null : gameId)
	}

	return (
		<div className="bg-ns-card border border-ns-border rounded-lg">
			{/* Header */}
			<div className="grid grid-cols-[40px_1fr_repeat(4,100px)_40px] gap-4 p-4 border-b border-ns-border text-xs text-ns-muted font-semibold uppercase">
				<div />
				<div>Team</div>
				<div className="text-center">Spread</div>
				<div className="text-center">Total</div>
				<div className="text-center">Moneyline</div>
				<div />
			</div>

			{/* Games */}
			<div className="divide-y divide-ns-border">
				{mockGames.map((game) => (
					<div key={game.id}>
						<div
							className={cn(
								'grid grid-cols-[40px_1fr_repeat(4,100px)_40px] gap-4 p-4 items-center cursor-pointer hover:bg-ns-border/20 transition-colors',
								expandedGame === game.id && 'bg-ns-border/10'
							)}
							onClick={() => toggleExpanded(game.id)}
						>
							{/* Time */}
							<div className="text-center text-xs text-ns-muted">
								{formatTime(Math.floor(game.startTime.getTime() / 1000))}
							</div>

							{/* Teams */}
							<div className="space-y-3">
								<div className="flex items-center space-x-2">
									<div className="w-5 h-5 bg-ns-border rounded-full" />
									<span className="text-sm font-medium text-ns-light">{game.awayTeam.name}</span>
								</div>
								<div className="flex items-center space-x-2">
									<div className="w-5 h-5 bg-ns-border rounded-full" />
									<span className="text-sm font-medium text-ns-light">{game.homeTeam.name}</span>
								</div>
							</div>

							{/* Spread */}
							<div className="space-y-1" onClick={(e) => e.stopPropagation()}>
								<OddsButton selection={createSelection(game, 'spread', 'away')} />
								<OddsButton selection={createSelection(game, 'spread', 'home')} />
							</div>

							{/* Total */}
							<div className="space-y-1" onClick={(e) => e.stopPropagation()}>
								<OddsButton selection={createSelection(game, 'total', 'over')} />
								<OddsButton selection={createSelection(game, 'total', 'under')} />
							</div>

							{/* Moneyline */}
							<div className="space-y-1" onClick={(e) => e.stopPropagation()}>
								<OddsButton selection={createSelection(game, 'moneyline', 'away')} />
								<OddsButton selection={createSelection(game, 'moneyline', 'home')} />
							</div>

							{/* More */}
							<div className="flex items-center justify-center">
								<ChevronDown
									className={cn(
										'h-5 w-5 transition-transform text-ns-muted',
										expandedGame === game.id ? 'rotate-180' : ''
									)}
								/>
							</div>
						</div>
						{/* Expanded Details */}
						{expandedGame === game.id && (
							<div className="p-4 border-t border-ns-border bg-ns-dark/50 text-xs text-ns-muted">
								<div className="grid grid-cols-4 gap-4">
									<div><strong>Status:</strong> {game.details.status}</div>
									<div><strong>Venue:</strong> {game.details.venue}</div>
									<div><strong>League:</strong> {game.details.league}</div>
									<div><strong>Start:</strong> {game.startTime.toLocaleString()}</div>
								</div>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

// Replace 'any' with a more specific type if possible, otherwise use 'unknown' or a proper interface