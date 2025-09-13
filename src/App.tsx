import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BettingProvider } from './contexts/BettingContext'

import { SideNavPanel } from './components/SideNavPanel'
import { WorkspacePanel } from './components/WorkspacePanel'
import { ActionHubPanel } from './components/ActionHubPanel'
import { PanelToggle } from './components/PanelToggle'
import { MobileBottomNav } from './components/MobileBottomNav'
import { MobileOverlay } from './components/MobileOverlay'

import { ResizeHandle } from './components/ResizeHandle'
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
  const { 
    showLeftPanel, 
    showRightPanel, 
    leftPanelWidth, 
    rightPanelWidth,
    toggleLeftPanel, 
    toggleRightPanel,
    setLeftPanelWidth,
    setRightPanelWidth
  } = usePanelState()

  // Keyboard shortcuts for panel toggling (desktop only)
  useKeyboardShortcuts({
    onToggleLeftPanel: isMobile ? () => {} : toggleLeftPanel,
    onToggleRightPanel: isMobile ? () => {} : toggleRightPanel,
    showLeftPanel: isMobile ? false : showLeftPanel,
    showRightPanel: isMobile ? false : showRightPanel
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
        {/* Desktop Layout */}
        {!isMobile && (
          <motion.div 
            className="flex-1 grid min-h-0 relative"
            style={{
              gridTemplateColumns: `${showLeftPanel ? `${leftPanelWidth}px` : '0px'} 1fr ${showRightPanel ? `${rightPanelWidth}px` : '0px'}`
            }}
            transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
          >
            {/* Left Panel - Navigation */}
            <motion.div 
              className="min-h-0 overflow-hidden relative bg-card/50 backdrop-blur-sm border-r border-border/50"
              animate={{ 
                opacity: showLeftPanel ? 1 : 0,
                x: showLeftPanel ? 0 : -20,
                boxShadow: showLeftPanel 
                  ? '4px 0 24px -12px rgba(0,0,0,0.08), 1px 0 0 0 rgba(0,0,0,0.02)' 
                  : 'none'
              }}
              transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
            >
              <AnimatePresence mode="wait">
                {showLeftPanel && (
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ 
                      duration: 0.35, 
                      ease: [0.4, 0.0, 0.2, 1],
                      delay: 0.05
                    }}
                    className="h-full relative"
                  >
                    <SideNavPanel className="h-full" />
                    
                    {/* Resize handle for left panel */}
                    <ResizeHandle
                      side="left"
                      onResize={setLeftPanelWidth}
                      currentWidth={leftPanelWidth}
                      minWidth={250}
                      maxWidth={500}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Center Panel - Workspace */}
            <motion.div 
              className={`min-h-0 relative bg-background ${
                !showLeftPanel && !showRightPanel 
                  ? 'shadow-2xl ring-1 ring-accent/20 rounded-lg mx-2 my-2' 
                  : 'border-x border-border'
              }`}
              animate={{
                scale: !showLeftPanel && !showRightPanel ? 1.005 : 1,
                borderRadius: !showLeftPanel && !showRightPanel ? '8px' : '0px'
              }}
              transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
            >
              {/* Left Panel Toggle */}
              <PanelToggle
                isOpen={showLeftPanel}
                onToggle={toggleLeftPanel}
                side="left"
                className="z-20"
              />

              {/* Right Panel Toggle */}
              <PanelToggle
                isOpen={showRightPanel}
                onToggle={toggleRightPanel}
                side="right"
                className="z-20"
              />

              <WorkspacePanel className="h-full" />
            </motion.div>

            {/* Right Panel - Action Hub */}
            <motion.div 
              className="min-h-0 overflow-hidden relative bg-card/50 backdrop-blur-sm border-l border-border/50"
              animate={{ 
                opacity: showRightPanel ? 1 : 0,
                x: showRightPanel ? 0 : 20,
                boxShadow: showRightPanel 
                  ? '-4px 0 24px -12px rgba(0,0,0,0.08), -1px 0 0 0 rgba(0,0,0,0.02)' 
                  : 'none'
              }}
              transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
            >
              <AnimatePresence mode="wait">
                {showRightPanel && (
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ 
                      duration: 0.35, 
                      ease: [0.4, 0.0, 0.2, 1],
                      delay: 0.05
                    }}
                    className="h-full relative"
                  >
                    <ActionHubPanel className="h-full" />
                    
                    {/* Resize handle for right panel */}
                    <ResizeHandle
                      side="right"
                      onResize={setRightPanelWidth}
                      currentWidth={rightPanelWidth}
                      minWidth={250}
                      maxWidth={500}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
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

