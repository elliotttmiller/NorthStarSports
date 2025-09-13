import { useState } from 'react'
import { Toaster } from 'sonner'
import { Toaster } from 'sonner'

import { WorkspacePa
import { PanelToggle } from './components/PanelToggle'
import { MobileOverlay } from './components/MobileOverlay'

import { PanelToggle } from './components/PanelToggle'
import { MobileBottomNav } from './components/MobileBottomNav'
import { MobileOverlay } from './components/MobileOverlay'
import { ResizeHandle } from './components/ResizeHandle'

// Hook imports
import { useIsMobile } from './hooks/useIsMobile'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'
  const isMobile = useIsMobile()

    showLeftPanel,
    leftPanelWidth,

    setLeftPanel
  } = usePanelState()
  

  useKeyb
    onToggleRightP
    showRightPanel

  const handleMobile
      case 'nav':
        break
    setLeftPanelWidth,
    setRightPanelWidth
  } = usePanelState()

  // Mobile panel state
  const [activeMobilePanel, setActiveMobilePanel] = useState<'nav' | 'betslip' | null>(null)

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onToggleLeftPanel: toggleLeftPanel,
    onToggleRightPanel: toggleRightPanel,
    showLeftPanel,
    showRightPanel
  })

  // Mobile navigation handler
  const handleMobileNavigation = (panel: 'nav' | 'betslip' | 'workspace' | 'profile') => {
    switch (panel) {
      case 'nav':
        setActiveMobilePanel('nav')
        break
      case 'betslip':
        setActiveMobilePanel('betslip')
        break
      case 'workspace':
        setActiveMobilePanel(null)
        break
      case 'profile':
        // Handle profile navigation if needed
        break
    }
  }

  return (
    <BettingProvider>
      <div className="flex flex-col h-screen bg-background text-foreground">
        {/* Desktop Layout */}
        {!isMobile ? (
          <div 
            className="flex-1 grid min-h-0 relative transition-all duration-300 ease-in-out"
            style={{
              gridTemplateColumns: `${showLeftPanel ? `${leftPanelWidth}px` : '0px'} 1fr ${showRightPanel ? `${rightPanelWidth}px` : '0px'}`
            }}
          >
            {/* Left Panel */}
            <AnimatePresence mode="wait">
              {showLeftPanel && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="min-h-0 border-r border-border bg-card"
                className=
                    boxShadow: showLeftPanel ? '4px 0 8px -2px rgba(0, 0, 0, 0.1)' : 'none'
                  }}
                >
                  <SideNavPanel />
                  <ResizeHandle
                    side="right"
                    currentWidth={leftPanelWidth}
                    onWidthChange={setLeftPanelWidth}
                    minWidth={250}
                    maxWidth={400}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Center Panel - Workspace */}
            <div className="min-h-0 relative flex flex-col">
              {/* Panel Toggle Buttons */}
              <PanelToggle
                isOpen={showLeftPanel}
                onClick={toggleLeftPanel}
                side="left"
                className="absolute left-2 top-4 z-10"
              />
              <PanelToggle
                isOpen={showRightPanel}
                onClick={toggleRightPanel}
                side="right"
                className="absolute right-2 top-4 z-10"
              />
              
              {/* Main Workspace */}
              <WorkspacePanel />
            </div>

            {/* Right Panel */}
            <AnimatePresence mode="wait">
              {showRightPanel && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="min-h-0 border-l border-border bg-card relative"
                  style={{

            <MobileO
              onC
            >
            </MobileOverlay>
            <MobileOverlay
              onClose={() => setActiveMobilePanel(
            >
            </MobileOverlay>
            {/* Bottom Navigation 
              onNavC
            />
        )}
        {/* Global Toast Notif
      </div>
  )









































