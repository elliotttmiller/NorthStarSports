"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { SmoothScrollContainer } from "@/components/VirtualScrolling";
import { useBetsContext } from "@/context/BetsContext";
import { useBetHistoryContext } from "@/context/BetHistoryContext";
import { useIsMobile } from "@/hooks/useIsMobile";
import {
  formatBetDescription,
  formatMatchup,
  formatParlayLegs,
} from "@/lib/betFormatters";

export default function Page() {
  const { bets } = useBetsContext();
  const { betHistory } = useBetHistoryContext();
  const isMobile = useIsMobile();
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
        className="h-full w-full flex flex-col overflow-hidden bg-muted/10"
      >
        <SmoothScrollContainer
          className="flex-1 universal-responsive-container"
          maxHeight="100vh"
          showScrollbar={false}
        >
          <div
            className={`container mx-auto max-w-screen-lg ${isMobile ? "px-3" : "px-6"}`}
            style={{
              padding: "var(--fluid-panel-padding)",
              fontSize: "var(--fluid-base)",
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Tabs defaultValue="active" className="w-full">
                <TabsList
                  className={`grid w-full grid-cols-3 mb-4 bg-muted/60 border border-border/30 ${isMobile ? "h-10" : "h-12"}`}
                >
                  <TabsTrigger
                    value="active"
                    className={`${isMobile ? "text-xs" : "text-sm"} font-bold data-[state=active]:bg-accent data-[state=active]:text-accent-foreground rounded-md`}
                  >
                    {isMobile ? "Active" : "Active Bets"}
                  </TabsTrigger>
                  <TabsTrigger
                    value="history"
                    className={`${isMobile ? "text-xs" : "text-sm"} font-bold data-[state=active]:bg-accent data-[state=active]:text-accent-foreground rounded-md`}
                  >
                    History
                  </TabsTrigger>
                  <TabsTrigger
                    value="stats"
                    className={`${isMobile ? "text-xs" : "text-sm"} font-bold data-[state=active]:bg-accent data-[state=active]:text-accent-foreground rounded-md`}
                  >
                    {isMobile ? "Stats" : "Statistics"}
                  </TabsTrigger>
                </TabsList>
                {/* ...restored tab content... */}
              </Tabs>
            </motion.div>
          </div>
        </SmoothScrollContainer>
      </motion.div>
    </AnimatePresence>
  );
}
