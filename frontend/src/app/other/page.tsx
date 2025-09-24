// Migrated from src/pages/OtherPage.tsx
import { Badge } from "@/components/ui/badge";
import { SmoothScrollContainer } from "@/components/VirtualScrolling";
import { useBetSlip } from "@/context/BetSlipContext";
import { AnimatePresence, motion } from "framer-motion";

const OtherPage = () => {
  const { betSlip } = useBetSlip();

  return (
    <AnimatePresence mode="wait">
      <motion.div key="other-page" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }} className="h-full w-full flex flex-col overflow-hidden bg-muted/10">
        <SmoothScrollContainer className="flex-1 min-h-0 universal-responsive-container scrollbar-hide" showScrollbar={false} maxHeight="100vh">
          <div className="container mx-auto px-4 max-w-screen-lg w-full">
            {/* Header */}
            <motion.div className="p-4 border-b border-border flex-shrink-0" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <h2 className="text-lg font-semibold text-card-foreground">Other Bet Types</h2>
              <p className="text-sm text-muted-foreground">Professional betting options</p>
              {betSlip.bets.length > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">{betSlip.bets.length} selections</Badge>
                </div>
              )}
            </motion.div>
            {/* ...existing code... */}
          </div>
        </SmoothScrollContainer>
      </motion.div>
    </AnimatePresence>
  );
};

export default OtherPage;
