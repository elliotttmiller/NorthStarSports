import { Card } from '@/components/ui/card'
import { SmoothScrollContainer } from '@/components/VirtualScrolling'
import { motion, AnimatePresence } from 'framer-motion'

export default function AccountPage() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="account-page"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
        className="h-full w-full flex flex-col overflow-hidden bg-muted/10"
      >
        <SmoothScrollContainer className="flex-1 w-full min-h-0" showScrollbar={false}>
          <div className="max-w-2xl mx-auto px-4 py-8 md:px-0 md:py-12 flex flex-col gap-6" style={{ fontSize: 'var(--fluid-base)' }}>
            {/* Welcome Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <h1 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight text-center md:text-left mb-2">Welcome, NorthStar User</h1>
            </motion.div>
            {/* Balance Card - Slim, professional, mobile-first */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="w-full"
            >
              <Card className="bg-card text-card-foreground border shadow-sm rounded-xl w-full max-w-full mx-auto p-0">
                <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-2 px-4 py-4">
                  <div className="flex flex-col items-center sm:items-start">
                    <span className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Balance</span>
                    <span className="text-2xl md:text-3xl font-bold text-foreground">$1,250.00</span>
                  </div>
                  <div className="flex flex-row gap-4 mt-2 sm:mt-0">
                    <div className="flex flex-col items-center sm:items-end">
                      <span className="text-xs text-muted-foreground">Available</span>
                      <span className="font-semibold text-foreground">$1,000.00</span>
                    </div>
                    <div className="flex flex-col items-center sm:items-end">
                      <span className="text-xs text-muted-foreground">Risk</span>
                      <span className="font-semibold text-foreground">$250.00</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
            {/* Add more slim, professional components here as needed */}
          {/* Bottom spacing for smooth scroll */}
          <div className="h-16" />
        </div>
        </SmoothScrollContainer>
      </motion.div>
    </AnimatePresence>
  )
}