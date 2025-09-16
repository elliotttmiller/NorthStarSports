import { useBetSlip } from '@/context/BetSlipContext'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { SmoothScrollContainer } from '@/components/VirtualScrolling'
import { TrendUp, Trophy, ChartBar, Calendar, CurrencyDollar } from '@phosphor-icons/react'
// ...existing code...
const trendingGames = [
	{
		id: 1,
		homeTeam: 'Lakers',
		awayTeam: 'Warriors',
		homeOdds: '-110',
		awayOdds: '+125',
		league: 'NBA',
		time: '8:00 PM EST',
		live: true,
		trending: true
	},
	{
		id: 2,
		homeTeam: 'Chiefs',
		awayTeam: 'Bills',
		homeOdds: '-150',
		awayOdds: '+130',
		league: 'NFL',
		time: '1:00 PM EST',
		live: false,
		trending: true
	}
]

const containerVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			staggerChildren: 0.13,
			delayChildren: 0.1,
			duration: 0.4
		}
	},
	exit: { opacity: 0, y: -30, transition: { duration: 0.3 } }
};
const sectionVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function HomePage() {
	// Removed unused variable 'navigation'
		const { betSlip } = useBetSlip()
		const activeBetsCount = betSlip.bets.length

	return (
		<AnimatePresence mode="wait">
			<motion.div
				key="home-page"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				exit="exit"
				className="h-full w-full flex flex-col overflow-hidden bg-background"
			>
				   <SmoothScrollContainer className="flex-1 w-full min-h-0" showScrollbar={false}>
					   <motion.div
						   className="mx-auto w-full max-w-3xl md:max-w-4xl lg:max-w-5xl px-6 md:px-10 lg:px-16 space-y-8"
						   style={{ padding: 'var(--fluid-panel-padding)', fontSize: 'var(--fluid-base)' }}
						   variants={containerVariants}
						   initial={false}
						   animate="visible"
					   >
						{/* Welcome Section */}
						<motion.div
							variants={sectionVariants}
							className="text-center"
						>
							<h1 className="text-2xl font-bold text-foreground mb-2">Welcome to NSSPORTSCLUB</h1>
							<p className="text-muted-foreground">Your professional sports betting platform</p>
						</motion.div>

						{/* Quick Stats */}
						   <motion.div
							   variants={sectionVariants}
							   className="flex justify-center"
						   >
							   <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-2xl">
								   {[
									   { icon: CurrencyDollar, label: 'Balance', value: '$1,250.00', color: 'text-accent' },
									   { icon: Trophy, label: 'Win Rate', value: '68%', color: 'text-accent' },
									   { icon: ChartBar, label: 'Active', value: activeBetsCount, color: 'text-primary' },
									   { icon: Calendar, label: 'This Week', value: '+$340', color: 'text-accent' }
								   ].map((stat) => (
									   <Card key={stat.label} className="bg-card/50 backdrop-blur-sm border-border/50 shadow-sm flex items-center justify-center min-h-[80px] md:min-h-[100px] min-w-[110px] md:min-w-[130px]" style={{ fontSize: 'var(--fluid-base)', borderRadius: 'var(--fluid-radius)' }}>
										   <CardContent style={{ padding: '1.1rem 0.75rem' }}>
											   <div className="flex flex-col items-center justify-center gap-1.5">
												   <stat.icon size={22} className={stat.color} />
												   <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
												   <p className="font-semibold text-base md:text-lg text-foreground">{stat.value}</p>
											   </div>
										   </CardContent>
									   </Card>
								   ))}
							   </div>
						   </motion.div>

						{/* My Bets Navigation */}
						<motion.div
							variants={sectionVariants}
						>
							<Button
								variant="outline"
								size="lg"
								asChild
								className="w-full mb-4"
							>
								<Link to="/my-bets" className="flex items-center space-x-2">
									<ChartBar size={20} />
									<span>My Bets</span>
									{activeBetsCount > 0 && (
										<Badge variant="secondary">
											{activeBetsCount}
										</Badge>
									)}
								</Link>
							</Button>
						</motion.div>

						{/* Trending Games */}
						<motion.div
							variants={sectionVariants}
						>
							<div className="flex items-center space-x-2 mb-4">
								<TrendUp size={20} className="text-accent" />
								<h2 className="text-lg font-semibold text-foreground">Trending Live Games</h2>
							</div>
							<div className="space-y-3">
								{trendingGames.map((game) => (
									<Card key={game.id} className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-all cursor-pointer" style={{ fontSize: 'var(--fluid-base)', borderRadius: 'var(--fluid-radius)' }}>
										<CardContent style={{ padding: 'var(--fluid-panel-padding)' }}>
											<div className="flex items-center justify-between">
												<div className="flex-1">
													<div className="flex items-center space-x-2 mb-2">
														<Badge variant="secondary" className="text-xs">
															{game.league}
														</Badge>
														{game.live && (
															<Badge variant="outline" className="text-xs border-accent/30 text-accent">
																LIVE
															</Badge>
														)}
														<span className="text-sm text-muted-foreground">{game.time}</span>
													</div>
													<p className="text-sm font-medium">{game.awayTeam} @ {game.homeTeam}</p>
												</div>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						</motion.div>

						{/* View All Games Button */}
						<motion.div
							variants={sectionVariants}
							className="text-center py-8"
						>
							<Button
								asChild
								size="lg"
								className="px-8 py-3"
							>
								<Link to="/games" className="flex items-center space-x-2">
									<Trophy size={20} />
									<span>View All Sports & Games</span>
								</Link>
							</Button>
						</motion.div>

						{/* Bottom spacing */}
						<div className="h-16" />
					</motion.div>
				</SmoothScrollContainer>
			</motion.div>
		</AnimatePresence>
	)
}