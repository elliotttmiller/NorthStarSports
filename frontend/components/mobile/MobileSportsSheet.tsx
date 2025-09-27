'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown, ChevronRight, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useMobileStore } from '@/store/mobile-state'
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

export default function MobileSportsSheet() {
	const [expandedSport, setExpandedSport] = useState<string | null>('Football')
	const [selectedLeague, setSelectedLeague] = useState<string | null>('NFL')
	const { isMenuOpen, setMenu } = useMobileStore()
	const router = useRouter()

	const toggleSport = (sportName: string) => {
		setExpandedSport(expandedSport === sportName ? null : sportName)
	}

	const handleLeagueClick = (league: { name: string; slug: string }) => {
		setSelectedLeague(league.name)
		router.push(`/sports/${league.slug}`)
		setMenu(false) // Close sheet after navigation
	}

	if (!isMenuOpen) return null

	return (
		<>
			{/* Backdrop */}
			<div
				className="fixed inset-0 bg-black/50 z-40 md:hidden"
				onClick={() => setMenu(false)}
			/>

			{/* Sheet */}
			<div className="fixed bottom-16 left-0 right-0 bg-ns-card border-t border-ns-border z-50 max-h-[70vh] overflow-hidden md:hidden">
				<div className="flex items-center justify-between p-4 border-b border-ns-border">
					<h2 className="text-lg font-bold text-ns-light">Sports & Leagues</h2>
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setMenu(false)}
					>
						<X className="h-5 w-5 text-ns-muted" />
					</Button>
				</div>

				<div className="overflow-y-auto p-4">
					<nav>
						<ul className="space-y-2">
							{sportsData.map((sport) => {
								const isExpanded = expandedSport === sport.name
								return (
									<li key={sport.name}>
										<button
											onClick={() => toggleSport(sport.name)}
											className="w-full flex items-center justify-between p-3 rounded-lg text-ns-light hover:bg-ns-border/50 transition-colors"
										>
											<span className="font-semibold">{sport.name}</span>
											{isExpanded ? (
												<ChevronDown className="h-4 w-4 text-ns-muted" />
											) : (
												<ChevronRight className="h-4 w-4 text-ns-muted" />
											)}
										</button>
										{isExpanded && (
											<ul className="pl-4 mt-2 space-y-1">
												{sport.leagues.map((league) => {
													const isSelected = selectedLeague === league.name
													return (
														<li key={league.name}>
															<button
																onClick={() => handleLeagueClick(league)}
																className={cn(
																	'w-full flex items-center justify-between text-left p-3 rounded-lg transition-colors',
																	isSelected
																		? 'bg-ns-blue text-white'
																		: 'text-ns-muted hover:text-ns-light hover:bg-ns-border/50'
																)}
															>
																<span className="font-medium">{league.name}</span>
																<Badge
																	variant={isSelected ? 'secondary' : 'default'}
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
			</div>
		</>
	)
}