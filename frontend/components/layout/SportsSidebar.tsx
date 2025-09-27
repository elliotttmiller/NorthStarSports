'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown, ChevronRight, ChevronLeft } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useUIStore } from '@/store/ui-state'
import { cn } from '@/lib/utils'

const sportsData = [
	{
		name: 'Football',
		leagues: [
			{ name: 'NFL', games: 10, slug: 'nfl' },
			{ name: 'NCAAF', games: 25, slug: 'ncaaf' },
		],
	},
	{
		name: 'Basketball',
		leagues: [
			{ name: 'NBA', games: 8, slug: 'nba' },
			{ name: 'NCAAB', games: 30, slug: 'ncaab' },
		],
	},
	{ name: 'Baseball', leagues: [{ name: 'MLB', games: 12, slug: 'mlb' }] },
	{ name: 'Hockey', leagues: [{ name: 'NHL', games: 6, slug: 'nhl' }] },
	{
		name: 'Soccer',
		leagues: [
			{ name: 'Premier League', games: 10, slug: 'premier-league' },
			{ name: 'La Liga', games: 9, slug: 'la-liga' },
		],
	},
]

export default function SportsSidebar() {
	const [expandedSport, setExpandedSport] = useState<string | null>('Football')
	const [selectedLeague, setSelectedLeague] = useState<string | null>('NFL')
	const { isSportsOpen, toggleSports } = useUIStore()
	const router = useRouter()

	const toggleSport = (sportName: string) => {
		setExpandedSport(expandedSport === sportName ? null : sportName)
	}

	const handleLeagueClick = (league: { name: string; slug: string }) => {
		setSelectedLeague(league.name)
		router.push(`/sports/${league.slug}`)
	}

	return (
		<>
			{/* Toggle Button - Hidden on mobile */}
			<Button
				variant="ghost"
				size="icon"
				onClick={toggleSports}
				className={cn(
					'fixed top-1/2 -translate-y-1/2 z-50 w-6 h-12 bg-ns-card/80 border border-ns-border/50 hover:bg-ns-border/30 backdrop-blur-sm transition-all duration-300 rounded-r-lg rounded-l-none shadow-lg',
					'hidden md:flex', // Hidden on mobile
					isSportsOpen ? 'left-[280px]' : 'left-0'
				)}
			>
				{isSportsOpen ? (
					<ChevronLeft className="h-3 w-3 text-ns-light" />
				) : (
					<ChevronRight className="h-3 w-3 text-ns-light" />
				)}
			</Button>

			{/* Sidebar Panel - Hidden on mobile */}
			<aside
				className={cn(
					'fixed left-0 top-16 bottom-0 bg-ns-card border-r border-ns-border overflow-y-auto transition-all duration-300 ease-in-out z-40',
					'hidden md:block', // Hidden on mobile
					isSportsOpen ? 'w-[280px] translate-x-0' : 'w-[280px] -translate-x-full'
				)}
			>
				<div className="p-4">
					<div className="mb-4">
						<h2 className="text-lg font-bold text-ns-light">Sports</h2>
						<p className="text-xs text-ns-muted">
							Select a sport to view leagues
						</p>
					</div>
					<nav>
						<ul>
							{sportsData.map((sport) => {
								const isExpanded = expandedSport === sport.name
								return (
									<li key={sport.name} className="mb-1">
										<button
											onClick={() => toggleSport(sport.name)}
											className="w-full flex items-center justify-between p-2 rounded-md text-ns-light hover:bg-ns-border/50 transition-colors"
										>
											<span className="font-semibold text-sm">
												{sport.name}
											</span>
											{isExpanded ? (
												<ChevronDown className="h-4 w-4 text-ns-muted" />
											) : (
												<ChevronRight className="h-4 w-4 text-ns-muted" />
											)}
										</button>
										{isExpanded && (
											<ul className="pl-4 mt-1 space-y-1">
												{sport.leagues.map((league) => {
													const isSelected = selectedLeague === league.name
													return (
														<li key={league.name}>
															<button
																onClick={() => handleLeagueClick(league)}
																className={cn(
																	'w-full flex items-center justify-between text-left p-2 rounded-md text-sm transition-colors',
																	isSelected
																		? 'bg-ns-blue text-white'
																		: 'text-ns-muted hover:text-ns-light hover:bg-ns-border/50'
																)}
															>
																<span>{league.name}</span>
																<Badge
																	variant={
																		isSelected
																			? 'secondary'
																			: 'default'
																	}
																	className={cn(
																		'text-xs',
																		isSelected
																			? 'bg-white/20 text-white'
																			: 'bg-ns-border text-ns-muted'
																	)}
																>
																	{league.games}
																</Badge>
															</button>
														</li>
													)
												})}
											</ul>
										)}
									</li>
								)
							})}
						</ul>
					</nav>
				</div>
			</aside>
		</>
	)
}