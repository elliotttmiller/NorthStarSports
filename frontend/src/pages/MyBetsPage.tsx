import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { motion, AnimatePresence } from 'framer-motion'
import { SmoothScrollContainer } from '@/components/VirtualScrolling'
import { useBetsContext } from '@/context/BetsContext'
import { useBetHistoryContext } from '@/context/BetHistoryContext'

export function MyBetsPage() {
  const { bets } = useBetsContext();
  const { betHistory } = useBetHistoryContext();
  const safeBets = Array.isArray(bets) ? bets : [];
  const safeBetHistory = Array.isArray(betHistory) ? betHistory : [];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="my-bets-page"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
        className="h-full w-full flex flex-col overflow-hidden bg-background"
      >
        <SmoothScrollContainer className="flex-1 universal-responsive-container" showScrollbar={false}>
          <div className="container mx-auto px-4 max-w-screen-lg w-full" style={{ padding: 'var(--fluid-panel-padding)', fontSize: 'var(--fluid-base)' }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Tabs defaultValue="active" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="active">Active Bets</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="stats">Statistics</TabsTrigger>
                </TabsList>
                <TabsContent value="active" className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <Card style={{ fontSize: 'var(--fluid-base)', borderRadius: 'var(--fluid-radius)' }}>
                      <CardContent>
                        <div className="space-y-3 bg-transparent">
                          {safeBets.length === 0 ? (
                            <motion.div className="text-muted-foreground text-center py-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                              <p>No active bets. Place a bet to see it here.</p>
                            </motion.div>
                          ) : safeBets.map((bet, index) => (
                            <motion.div
                              key={bet.id}
                              className="group w-full rounded-xl bg-background/90 border border-border/60 shadow-sm mb-2 transition-all duration-200 flex items-stretch px-4 py-3 gap-2 cursor-pointer hover:-translate-y-1 hover:shadow-lg"
                              style={{ boxSizing: 'border-box', willChange: 'transform' }}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                              whileHover={{ y: -2, scale: 1.01 }}
                            >
                              {/* Left: Team names, left-aligned */}
                              <div className="flex flex-col justify-center gap-0.5 min-w-0 flex-1 text-left">
                                <span className="text-sm font-semibold truncate">
                                  {bet.game?.awayTeam?.shortName}
                                  <span className="text-muted-foreground font-normal"> @ </span>
                                  {bet.game?.homeTeam?.shortName}
                                </span>
                              </div>
                              {/* Right: Odds, Stake, Remove, right-aligned */}
                              <div className="flex items-center gap-2 min-w-0 justify-end text-right">
                                <Badge className="text-accent border-accent/40 bg-accent/15 font-mono px-2 py-0.5 text-xs min-w-[32px] text-center flex items-center justify-center rounded-md">
                                  {bet.odds > 0 ? `+${bet.odds}` : bet.odds}
                                </Badge>
                                <div className="w-16 h-8 flex items-center justify-end text-xs font-semibold bg-background/80 rounded-md px-2 py-1 shadow-xs">
                                  ${bet.stake.toFixed(2)}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
                <TabsContent value="history" className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <Card style={{ fontSize: 'var(--fluid-base)', borderRadius: 'var(--fluid-radius)' }}>
                      <CardHeader>
                        <CardTitle style={{ fontSize: 'var(--fluid-lg)' }}>Betting History</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3 bg-transparent">
                          {safeBetHistory.length === 0 ? (
                            <motion.div className="text-muted-foreground text-center py-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                              <p>No betting history available yet. Place some bets to see your history here.</p>
                            </motion.div>
                          ) : safeBetHistory.map((slip, i) => (
                            <motion.div
                              key={(Array.isArray(slip.bets) ? slip.bets.map(b=>b.id).join('-') : `slip-${i}`)}
                              className="group w-full rounded-xl bg-background/90 border border-border/60 shadow-sm mb-2 transition-all duration-200 flex flex-col px-4 py-3 gap-2 cursor-pointer hover:-translate-y-1 hover:shadow-lg"
                              style={{ boxSizing: 'border-box', willChange: 'transform' }}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                              whileHover={{ y: -2, scale: 1.01 }}
                            >
                              <div className="flex flex-wrap gap-2 items-center mb-1">
                                <span className="text-xs font-bold text-muted-foreground">{slip.betType ? slip.betType.toUpperCase() : '-'}</span>
                                <span className="text-xs text-muted-foreground">{Array.isArray(slip.bets) ? slip.bets.length : 0} picks</span>
                                <Badge className="text-accent border-accent/40 bg-accent/15 font-mono px-2 py-0.5 text-xs min-w-[32px] text-center flex items-center justify-center rounded-md">
                                  {slip.totalOdds > 0 ? `+${slip.totalOdds}` : slip.totalOdds}
                                </Badge>
                              </div>
                              <div className="flex flex-col gap-1">
                                {(Array.isArray(slip.bets) ? slip.bets : []).map((bet) => (
                                  <div key={bet.id} className="flex items-center justify-between">
                                    <span className="text-xs font-semibold truncate">
                                      {bet.game?.awayTeam?.shortName}
                                      <span className="text-muted-foreground font-normal"> @ </span>
                                      {bet.game?.homeTeam?.shortName}
                                    </span>
                                    <Badge className="text-accent border-accent/40 bg-accent/15 font-mono px-2 py-0.5 text-xs min-w-[32px] text-center flex items-center justify-center rounded-md">
                                      {bet.odds > 0 ? `+${bet.odds}` : bet.odds}
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-muted-foreground">Stake: <span className="font-semibold text-foreground">${(typeof slip.totalStake === 'number' ? slip.totalStake : 0).toFixed(2)}</span></span>
                                <span className="text-xs text-muted-foreground">Payout: <span className="font-semibold text-accent">${(typeof slip.totalPayout === 'number' ? slip.totalPayout : 0).toFixed(2)}</span></span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
                <TabsContent value="stats" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { title: 'Total Wagered', value: '$0.00' },
                      { title: 'Win Rate', value: '0%' },
                      { title: 'Net Profit', value: '$0.00' }
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: 0.2 + index * 0.1,
                          ease: [0.4, 0.0, 0.2, 1]
                        }}
                        whileHover={{ y: -4, scale: 1.02 }}
                      >
                        <Card className="hover:shadow-md transition-shadow" style={{ fontSize: 'var(--fluid-base)', borderRadius: 'var(--fluid-radius)' }}>
                          <CardHeader className="pb-2">
                            <CardTitle style={{ fontSize: 'var(--fluid-base)' }}>{stat.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </SmoothScrollContainer>
      </motion.div>
    </AnimatePresence>
  )
}