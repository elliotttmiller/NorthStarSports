'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import GameCard from '@/components/betting/GameCard'
import BetSlip from '@/components/betting/BetSlip'
import { Search, Filter, Calendar, Clock, Star, Flame } from 'lucide-react'

const sports = [
	{ id: 'nfl', name: 'NFL', icon: '🏈', games: 16, live: 2, color: 'orange' },
	{ id: 'nba', name: 'NBA', icon: '🏀', games: 12, live: 4, color: 'orange' },
	{ id: 'mlb', name: 'MLB', icon: '⚾', games: 8, live: 1, color: 'blue' },
	{ id: 'nhl', name: 'NHL', icon: '🏒', games: 4, live: 0, color: 'blue' },
	{ id: 'soccer', name: 'Soccer', icon: '⚽', games: 24, live: 8, color: 'green' },
	{ id: 'tennis', name: 'Tennis', icon: '🎾', games: 18, live: 3, color: 'green' },
	{ id: 'mma', name: 'MMA', icon: '🥊', games: 3, live: 0, color: 'red' },
	{ id: 'golf', name: 'Golf', icon: '⛳', games: 5, live: 1, color: 'green' },
]

const mockGames = [
	{
		id: '1',
		homeTeam: { name: 'Cincinnati Bengals', score: 0, logo: '/logos/bengals.svg' },
		awayTeam: { name: 'Baltimore Ravens', score: 0, logo: '/logos/ravens.svg' },
		startTime: new Date('2024-09-26T15:47:00'),
		odds: {
			spread: { home: -5, away: +5, odds: -110 },
			moneyline: { home: +160, away: -165 },
			total: { line: 64.5, odds: -110 },
		},
		details: {
			league: 'NFL',
			status: 'scheduled',
			venue: 'Stadium Name',
		},
	},
	{
		id: '2',
		homeTeam: { name: 'Miami Heat', score: 78, logo: '/logos/heat.svg' },
		awayTeam: { name: 'Boston Celtics', score: 82, logo: '/logos/celtics.svg' },
		startTime: new Date('2024-01-15T21:30:00'),
		odds: {
			spread: { home: -2.5, away: +2.5, odds: -105 },
			moneyline: { home: -120, away: +110 },
			total: { line: 210.5, odds: -110 },
		},
		details: {
			league: 'NBA',
			status: 'live',
			venue: 'Arena Name',
		},
	},
	{
		id: '3',
		homeTeam: { name: 'Kansas City Chiefs', score: 0, logo: '/logos/chiefs.svg' },
		awayTeam: { name: 'Buffalo Bills', score: 0, logo: '/logos/bills.svg' },
		startTime: new Date('2024-01-16T13:00:00'),
		odds: {
			spread: { home: -4.5, away: +4.5, odds: -110 },
			moneyline: { home: -180, away: +160 },
			total: { line: 48.5, odds: -110 },
		},
		details: {
			league: 'NFL',
			status: 'scheduled',
			venue: 'Stadium Name',
		},
	},
	{
		id: '4',
		homeTeam: { name: 'New York Rangers', score: 0, logo: '/logos/rangers.svg' },
		awayTeam: { name: 'Boston Bruins', score: 0, logo: '/logos/bruins.svg' },
		startTime: new Date('2024-01-15T19:00:00'),
		odds: {
			spread: { home: -1.5, away: +1.5, odds: +120 },
			moneyline: { home: +105, away: -125 },
			total: { line: 5.5, odds: -110 },
		},
		details: {
			league: 'NHL',
			status: 'scheduled',
			venue: 'Arena Name',
		},
	},
]

const popularBets = [
	{ selection: 'Lakers ML', odds: -150, popularity: 85 },
	{ selection: 'Over 215.5', odds: -110, popularity: 72 },
	{ selection: 'Chiefs -3.5', odds: -108, popularity: 91 },
	{ selection: 'Heat +6.5', odds: -105, popularity: 68 },
]

export default function SportsPage() {
	const [selectedSport, setSelectedSport] = useState('all')
	const [searchQuery, setSearchQuery] = useState('')
	const [timeFilter, setTimeFilter] = useState<'today' | 'live'>('today')

	const filteredGames = mockGames
		.filter((game) => {
			if (selectedSport === 'all') return true
			return game.details.league.toLowerCase() === selectedSport
		})
		.filter((game) => {
			if (!searchQuery) return true
			return (
				game.homeTeam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				game.awayTeam.name.toLowerCase().includes(searchQuery.toLowerCase())
			)
		})

	const totalLiveGames = sports.reduce((acc, sport) => acc + sport.live, 0)

	return (
		<div className="min-h-screen bg-ns-dark-50">
			<div className="container py-8">
				<div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
					{/* Main Content */}
					<div className="xl:col-span-3">
						{/* Header */}
						<div className="mb-8">
							<div className="flex items-center justify-between mb-4">
								<div>
									<h1 className="text-3xl lg:text-4xl font-display font-bold text-ns-dark-900">
										Sports Betting
									</h1>
									<p className="text-ns-dark-600 mt-1">
										Discover live odds and place bets on your favorite sports
									</p>
								</div>
								<div className="hidden sm:flex items-center space-x-3">
									<Badge variant="secondary" className="animate-pulse">
										{totalLiveGames} Live Games
									</Badge>
									<Button variant="default" size="sm">
										<Star className="h-4 w-4 mr-2" />
										Featured
									</Button>
								</div>
							</div>
						</div>

						{/* Search and Filters */}
						<div className="mb-8 space-y-4">
							<div className="flex flex-col sm:flex-row gap-4">
								<div className="relative flex-1">
									<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ns-dark-400" />
									<Input
										placeholder="Search teams, leagues, games..."
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										className="pl-10"
									/>
								</div>
								<div className="flex space-x-2">
									<Button variant="outline" size="sm">
										<Filter className="h-4 w-4 mr-2" />
										Filters
									</Button>
									<Button
										variant={timeFilter === 'today' ? 'default' : 'outline'}
										size="sm"
										onClick={() => setTimeFilter('today')}
									>
										<Calendar className="h-4 w-4 mr-2" />
										Today
									</Button>
									<Button
										variant={timeFilter === 'live' ? 'default' : 'outline'}
										size="sm"
										onClick={() => setTimeFilter('live')}
									>
										<Clock className="h-4 w-4 mr-2" />
										Live
									</Button>
								</div>
							</div>

							{/* Sports Filter */}
							<div className="overflow-x-auto scrollbar-hide">
								<div className="flex space-x-3 pb-2">
									<Button
										variant={selectedSport === 'all' ? 'default' : 'outline'}
										size="sm"
										onClick={() => setSelectedSport('all')}
										className="whitespace-nowrap"
									>
										All Sports
										<Badge variant="secondary" className="ml-2">
											{mockGames.length}
										</Badge>
									</Button>
									{sports.map((sport) => (
										<Button
											key={sport.id}
											variant={selectedSport === sport.id ? 'default' : 'outline'}
											size="sm"
											onClick={() => setSelectedSport(sport.id)}
											className="whitespace-nowrap"
										>
											<span className="mr-2">{sport.icon}</span>
											{sport.name}
											<Badge variant="secondary" className="ml-2">
												{sport.games}
											</Badge>
											{sport.live > 0 && (
												<Badge variant="secondary" className="ml-1 animate-pulse">
													{sport.live}
												</Badge>
											)}
										</Button>
									))}
								</div>
							</div>
						</div>

						{/* Games Grid */}
						<div className="space-y-6">
							{filteredGames.length === 0 ? (
								<div className="text-center py-16">
									<div className="p-6 bg-ns-dark-100 rounded-full w-fit mx-auto mb-6">
										<Search className="h-12 w-12 text-ns-dark-400" />
									</div>
									<h3 className="text-xl font-semibold text-ns-dark-900 mb-2">
										No games found
									</h3>
									<p className="text-ns-dark-600 mb-6 max-w-md mx-auto">
										Try adjusting your search criteria or browse different sports
										categories
									</p>
									<Button
										onClick={() => {
											setSearchQuery('')
											setSelectedSport('all')
										}}
									>
										Reset Filters
									</Button>
								</div>
							) : (
								<>
									<div className="flex items-center justify-between">
										<h2 className="text-xl font-display font-bold text-ns-dark-900">
											{selectedSport === 'all'
												? 'All Games'
												: `${
														sports.find((s) => s.id === selectedSport)?.name
												  } Games`}
										</h2>
										<div className="text-sm text-ns-dark-500">
											{filteredGames.length} game
											{filteredGames.length !== 1 ? 's' : ''} available
										</div>
									</div>

									<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
										{filteredGames.map((game) => (
											<GameCard key={game.id} game={game} />
										))}
									</div>
								</>
							)}
						</div>
					</div>

					{/* Sidebar */}
					<div className="xl:col-span-1">
						<div className="space-y-6 sticky top-24">
							{/* Bet Slip */}
							<BetSlip />

							{/* Popular Bets */}
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center text-base">
										<Flame className="h-4 w-4 mr-2 text-orange-500" />
										Popular Bets
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-3">
									{popularBets.map((bet, index) => (
										<div
											key={index}
											className="flex items-center justify-between p-3 bg-ns-dark-50 rounded-lg hover:bg-ns-blue-50 transition-colors cursor-pointer group"
										>
											<div className="flex-1">
												<div className="font-medium text-sm text-ns-dark-900">
													{bet.selection}
												</div>
												<div className="flex items-center space-x-2 mt-1">
													<div className="w-full h-1.5 bg-ns-dark-200 rounded-full overflow-hidden">
														<div
															className={`h-full bg-orange-400 rounded-full transition-all duration-300 w-[${bet.popularity}%]`}
														/>
													</div>
													<span className="text-xs text-ns-dark-500">
														{bet.popularity}%
													</span>
												</div>
											</div>
											<div className="ml-3">
												<Badge
													variant="outline"
													className="font-mono bg-white group-hover:bg-ns-blue-100 transition-colors"
												>
													{bet.odds > 0 ? `+${bet.odds}` : bet.odds}
												</Badge>
											</div>
										</div>
									))}
									<Button variant="outline" size="sm" className="w-full">
										View All Popular Bets
									</Button>
								</CardContent>
							</Card>

							{/* Live Games */}
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center text-base">
										<div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
										Live Games
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-3">
									<div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
										<div>
											<div className="font-medium text-sm">Heat vs Celtics</div>
											<div className="text-xs text-red-600 font-medium">
												Q2 • 7:45
											</div>
										</div>
										<div className="text-right">
											<div className="text-sm font-bold">78-82</div>
											<Badge variant="secondary" className="text-xs animate-pulse">
												LIVE
											</Badge>
										</div>
									</div>

									<div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
										<div>
											<div className="font-medium text-sm">Lakers vs Warriors</div>
											<div className="text-xs text-red-600 font-medium">
												Q3 • 2:15
											</div>
										</div>
										<div className="text-right">
											<div className="text-sm font-bold">95-101</div>
											<Badge variant="secondary" className="text-xs animate-pulse">
												LIVE
											</Badge>
										</div>
									</div>

									<Button variant="outline" size="sm" className="w-full">
										View All Live Games
									</Button>
								</CardContent>
							</Card>

							{/* Promotions */}
							<Card className="bg-gradient-to-br from-ns-gold-50 to-ns-gold-100 border-ns-gold-200">
								<CardHeader>
									<CardTitle className="flex items-center text-base text-ns-gold-900">
										<Star className="h-4 w-4 mr-2" />
										Daily Boost
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-3">
										<div>
											<div className="text-sm font-semibold text-ns-gold-900 mb-1">
												Enhanced Parlay Odds
											</div>
											<div className="text-xs text-ns-gold-800">
												Get +25% boost on 3+ leg parlays today only
											</div>
										</div>
										<Button
											size="sm"
											variant="default"
											className="w-full font-semibold bg-gradient-to-br from-ns-gold-50 to-ns-gold-100 text-ns-gold-900"
										>
											Claim Boost
										</Button>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}