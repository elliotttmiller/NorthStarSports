'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMobileStore } from '@/store/mobile-state'
import { ChevronDown, ChevronRight, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

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

export default function SportsBottomSheet() {
	const [expandedSport, setExpandedSport] = useState<string | null>(null)
	const { isMenuOpen, setMenu } = useMobileStore()
	const router = useRouter()

	const toggleSport = (sportName: string) => {
		setExpandedSport(expandedSport === sportName ? null : sportName)
	}

	const handleLeagueClick = (league: { name: string; slug: string }) => {
		router.push(`/sports/${league.slug}`)
		setMenu(false) // Close menu after navigation
	}

	if (!isMenuOpen) return null

	return (
		<>
			{/* Backdrop */}
			<div
				className="fixed inset-0 bg-black/50 z-50 md:hidden"
				onClick={() => setMenu(false)}
			/>

			{/* Bottom Sheet */}
			<div className="fixed bottom-0 left-0 right-0 z-50 bg-ns-card rounded-t-2xl border-t border-ns-border max-h-[70vh] flex flex-col md:hidden">
				{/* Handle */}
				<div className="flex justify-center pt-3 pb-2">
					<div className="w-12 h-1 bg-ns-border rounded-full" />
				</div>

				{/* Header */}
				<div className="flex items-center justify-between p-4 border-b border-ns-border">
					<h2 className="text-lg font-bold text-ns-light">Sports & Leagues</h2>
					<button
						onClick={() => setMenu(false)}
						className="p-2 rounded-full hover:bg-ns-border/50"
						title="Close"
						aria-label="Close"
					>
						<X className="h-5 w-5 text-ns-muted" />
					</button>
				</div>

				{/* Sports List */}
				<div className="flex-1 overflow-y-auto">
					<div className="p-4">
						<nav>
							<ul className="space-y-1">
								{sportsData.map((sport) => {
									const isExpanded = expandedSport === sport.name
									return (
										<li key={sport.name}>
											<button
												onClick={() => toggleSport(sport.name)}
												className="w-full flex items-center justify-between p-3 rounded-md text-ns-light hover:bg-ns-border/50 transition-colors"
											>
												<span className="font-semibold text-base">
													{sport.name}
												</span>
												{isExpanded ? (
													<ChevronDown className="h-5 w-5 text-ns-muted" />
												) : (
													<ChevronRight className="h-5 w-5 text-ns-muted" />
												)}
											</button>
											{isExpanded && (
												<ul className="pl-4 mt-2 space-y-1">
													{sport.leagues.map((league) => (
														<li key={league.name}>
															<button
																onClick={() => handleLeagueClick(league)}
																className="w-full flex items-center justify-between text-left p-3 rounded-md text-base transition-colors text-ns-muted hover:text-ns-light hover:bg-ns-border/50"
															>
																<span>{league.name}</span>
																<Badge
																	variant="default"
																	className="bg-ns-border text-ns-muted text-sm"
																>
																	{league.games}
																</Badge>
															</button>
														</li>
													))}
												</ul>
											)}
										</li>
									)
								})}
							</ul>
						</nav>
					</div>
				</div>
			</div>
		</>
	)
}