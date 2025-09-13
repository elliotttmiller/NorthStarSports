import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BettingProvider } from './contexts/BettingContext'
import { HeaderNavbar } from './components/HeaderNavbar'
import { SideNavPanel } from './components/SideNavPanel'
import { WorkspacePanel } from './components/WorkspacePanel'
import { ActionHubPanel } from './components/ActionHubPanel'
import { MobileBottomNav } from './components/MobileBottomNav'
import { MobileOverlay } from './components/MobileOverlay'
import { useIsMobile } from './hooks/useIsMobile'
import { usePanelState } from './hooks/usePanelState'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'
import { Toaster } from '@/components/ui/sonner'

function App() {
  const isMobile = useIsMobile()
  const [activeMobilePanel, setActiveMobilePanel] = useState('workspace')
  const [showMobileNav, setShowMobileNav] = useState(false)
  const [showMobileBetSlip, setShowMobileBetSlip] = useState(false)
  
  // Desktop panel visibility state with persistence
  const { showLeftPanel, showRightPanel, toggleLeftPanel, toggleRightPanel } = usePanelState()

  // Keyboard shortcuts for panel toggling (desktop only)
  useKeyboardShortcuts({
    onToggleLeftPanel: isMobile ? () => {} : toggleLeftPanel,
    onToggleRightPanel: isMobile ? () => {} : toggleRightPanel,
  })

  const handleMobileNavClick = (panel: string) => {
    switch (panel) {
      case 'nav':
        setShowMobileNav(true)
        break
      case 'workspace':
        setActiveMobilePanel('workspace')
        setShowMobileNav(false)
        setShowMobileBetSlip(false)
        break
      case 'betslip':
        setShowMobileBetSlip(true)
        break
      case 'profile':
        setActiveMobilePanel('profile')
        setShowMobileNav(false)
        setShowMobileBetSlip(false)
        break
    }
  }

  return (
    <BettingProvider>
      <div className="h-screen flex flex-col bg-background">
        {/* Fixed Header - Desktop Only */}
        {!isMobile && (
          <HeaderNavbar
            showLeftPanel={showLeftPanel}
            showRightPanel={showRightPanel}
            onToggleLeftPanel={toggleLeftPanel}
            onToggleRightPanel={toggleRightPanel}
          />
        )}

        {/* Desktop Layout */}
        {!isMobile && (
          <motion.div 
            className="flex-1 grid min-h-0 pt-14"
            style={{
              gridTemplateColumns: `${showLeftPanel ? '300px' : '0px'} 1fr ${showRightPanel ? '300px' : '0px'}`
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {/* Left Panel - Navigation */}
            <div className="min-h-0 overflow-hidden">
              <AnimatePresence mode="wait">
                {showLeftPanel && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="h-full"
                  >
                    <SideNavPanel className="h-full" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Center Panel - Workspace */}
            <motion.div 
              className={`min-h-0 border-x border-border ${
                !showLeftPanel && !showRightPanel 
                  ? 'shadow-lg ring-1 ring-accent/10' 
                  : ''
              }`}
              animate={{
                borderColor: !showLeftPanel && !showRightPanel 
                  ? 'var(--accent)' 
                  : 'var(--border)'
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <WorkspacePanel className="h-full" />
            </motion.div>

            {/* Right Panel - Action Hub */}
            <div className="min-h-0 overflow-hidden">
              <AnimatePresence mode="wait">
                {showRightPanel && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="h-full"
                  >
                    <ActionHubPanel className="h-full" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Mobile Layout */}
        {isMobile && (
          <>
            <div className="flex-1 overflow-hidden pb-16">
              {activeMobilePanel === 'workspace' && (
                <WorkspacePanel className="h-full" />
              )}
              {activeMobilePanel === 'profile' && (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <h2 className="text-xl font-semibold">Profile</h2>
                    <p className="text-muted-foreground">Profile features coming soon</p>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Navigation Overlay */}
            <MobileOverlay
              isOpen={showMobileNav}
              onClose={() => setShowMobileNav(false)}
              title="Sports Navigation"
            >
              <SideNavPanel className="h-full border-none" />
            </MobileOverlay>

            {/* Mobile Bet Slip Overlay */}
            <MobileOverlay
              isOpen={showMobileBetSlip}
              onClose={() => setShowMobileBetSlip(false)}
              title="Bet Slip"
              slideFrom="right"
            >
              <ActionHubPanel className="h-full border-none" />
            </MobileOverlay>

            {/* Bottom Navigation */}
            <MobileBottomNav
              activePanel={activeMobilePanel}
              onNavClick={handleMobileNavClick}
            />
          </>
        )}

        <Toaster />
      </div>
    </BettingProvider>
  )
}

export default App