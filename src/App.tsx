import React from 'react'
import { Toaster } from 'sonner'

// Context
import { BettingProvider } from './contexts/BettingContext'

// Components
import { HeaderNavbar } from './components/HeaderNavbar'
import { SideNavPanel } from './components/SideNavPanel'
import { WorkspacePanel } from './components/WorkspacePanel'
import { ActionHubPanel } from './components/ActionHubPanel'
import { MobileOverlay } from './components/MobileOverlay'
import { MobileBottomNav } from './components/MobileBottomNav'

// Hooks
import { useIsMobile } from './hooks/useIsMobile'
import { usePanelState, ActivePanel } from './hooks/usePanelState'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'

function App() {
  const isMobile = useIsMobile()
  const {
    showLeftPanel,
    showRightPanel,
    toggleLeftPanel,
    toggleRightPanel,
    showSportsOverlay,
    showBetSlipOverlay,
    setShowSportsOverlay,
    setShowBetSlipOverlay,
    activePanel,
    setActivePanel
  } = usePanelState()

  // Enable keyboard shortcuts for desktop
  useKeyboardShortcuts({
    onToggleLeftPanel: toggleLeftPanel,
    onToggleRightPanel: toggleRightPanel,
    showLeftPanel,
    showRightPanel
  })

  const handleMobileNavigation = (panel: ActivePanel) => {
    switch (panel) {
      case 'sports':
        setShowSportsOverlay(true)
        setActivePanel('sports')
        break
      case 'betslip':
        setShowBetSlipOverlay(true)
        setActivePanel('betslip')
        break
      case 'home':
        setShowSportsOverlay(false)
        setShowBetSlipOverlay(false)
        setActivePanel('home')
        break
      case 'profile':
        // Handle profile if needed
        setActivePanel('profile')
        break
    }
  }

  return (
    <BettingProvider>
      <div className="flex flex-col h-screen bg-background">
        {/* Header */}
        <HeaderNavbar 
          onToggleLeftPanel={toggleLeftPanel}
          onToggleRightPanel={toggleRightPanel}
          showLeftPanel={showLeftPanel}
          showRightPanel={showRightPanel}
        />

        {/* Main Content Area */}
        <div className="flex flex-1 min-h-0">
          {isMobile ? (
            <>
              {/* Mobile Layout */}
              <div className="flex flex-col flex-1">
                {/* Main mobile content */}
                <div className="flex-1 min-h-0">
                  <WorkspacePanel />
                </div>

                {/* Mobile Sports Overlay */}
                <MobileOverlay
                  isOpen={showSportsOverlay}
                  onClose={() => setShowSportsOverlay(false)}
                  title="Sports"
                >
                  <SideNavPanel />
                </MobileOverlay>

                {/* Mobile Bet Slip Overlay */}
                <MobileOverlay
                  isOpen={showBetSlipOverlay}
                  onClose={() => setShowBetSlipOverlay(false)}
                  title="Bet Slip"
                >
                  <ActionHubPanel />
                </MobileOverlay>

                {/* Mobile Bottom Navigation */}
                <MobileBottomNav
                  activePanel={activePanel}
                  onNavClick={handleMobileNavigation}
                />
              </div>
            </>
          ) : (
            <>
              {/* Desktop Layout */}
              {/* Left Panel */}
              {showLeftPanel && (
                <div className="flex-shrink-0 w-80 border-r bg-card">
                  <SideNavPanel />
                </div>
              )}

              {/* Center Panel */}
              <div className="flex-1 min-w-0">
                <WorkspacePanel />
              </div>

              {/* Right Panel */}
              {showRightPanel && (
                <div className="flex-shrink-0 w-96 border-l bg-card">
                  <ActionHubPanel />
                </div>
              )}
            </>
          )}
        </div>

        {/* Toast notifications */}
        <Toaster position="top-right" />
      </div>
    </BettingProvider>
  )
}

export default App