// Migrated from src/pages/MyBetsPage.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { SmoothScrollContainer } from "@/components/VirtualScrolling";
import { useBetsContext } from "@/context/BetsContext";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function MyBetsPageOptimized() {
  const { bets } = useBetsContext();
  const isMobile = useIsMobile();
  const safeBets = Array.isArray(bets) ? bets : [];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="my-bets-page"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
        className="h-full w-full flex flex-col overflow-hidden bg-muted/10"
      >
        <div className="flex-1 min-h-0 universal-responsive-container scrollbar-hide">
          <SmoothScrollContainer
            className="w-full h-full"
            maxHeight="100vh"
            showScrollbar={false}
          >
            <div className={`container mx-auto max-w-screen-lg w-full ${isMobile ? "px-3" : "px-6"} py-6 text-base`}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.1 }}>
                <Tabs defaultValue="active" className="w-full">
                  <TabsList className={`grid w-full grid-cols-3 mb-4 bg-muted/60 border border-border/30 ${isMobile ? "h-10" : "h-12"}`}>
                    <TabsTrigger value="active" className={`${isMobile ? "text-xs" : "text-sm"} font-bold data-[state=active]:bg-accent data-[state=active]:text-accent-foreground rounded-md`}>
                      {isMobile ? "Active" : "Active Bets"}
                    </TabsTrigger>
                    <TabsTrigger value="history" className={`${isMobile ? "text-xs" : "text-sm"} font-bold data-[state=active]:bg-accent data-[state=active]:text-accent-foreground rounded-md`}>
                      History
                    </TabsTrigger>
                    <TabsTrigger value="stats" className={`${isMobile ? "text-xs" : "text-sm"} font-bold data-[state=active]:bg-accent data-[state=active]:text-accent-foreground rounded-md`}>
                      {isMobile ? "Stats" : "Statistics"}
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="active" className="space-y-4">
                    {safeBets.length > 0 && (
                      <Card className="mb-4 bg-gradient-to-r from-secondary/10 to-secondary/20 border-secondary/30">
                        <CardContent className="p-4">
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <p className="text-xs text-muted-foreground font-semibold">Active Bets</p>
                              <p className="text-lg font-bold text-foreground">{safeBets.length}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground font-semibold">Total Staked</p>
                              <p className="text-lg font-bold text-foreground">
                                ${safeBets.reduce((sum, bet) => sum + (bet.stake || 0), 0).toFixed(2)}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground font-semibold">Potential Payout</p>
                              <p className="text-lg font-bold text-[color:var(--color-win)]">
                                ${safeBets.reduce((sum, bet) => sum + (bet.potentialPayout || 0), 0).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                    <Card className="bg-transparent border-border/20" style={{ fontSize: "var(--fluid-base)", borderRadius: "var(--fluid-radius)" }}>
                      <CardContent className={isMobile ? "p-3" : "p-4"}>
                        <div className={`bg-transparent ${isMobile ? "space-y-3" : "space-y-4"}`}>
                          {/* ...existing code... */}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  {/* ...existing code... */}
                </Tabs>
              </motion.div>
            </div>
          </SmoothScrollContainer>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
