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
import { usePanelState } from './hooks/usePanelState'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'

function App() {
  const isMobile = useIsMobile()
  const {
    showLeftPanel,
    showRightPanel,
    leftPanelWidth,
    rightPanelWidth,
    toggleLeftPanel,
    toggleRightPanel,
    setLeftPanelWidth,
    setRightPanelWidth,
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

  // Mobile navigation handlers
  const handleMobileNavigation = (panel: 'home' | 'sports' | 'betslip' | 'profile') => {
    switch (panel) {
      case 'home':
        setActivePanel('home')
        setShowSportsOverlay(false)
        setShowBetSlipOverlay(false)
        break
      case 'sports':
        setShowSportsOverlay(true)
        break
      case 'betslip':
        setShowBetSlipOverlay(true)
        break
      case 'profile':
        setActivePanel('profile')
        setShowSportsOverlay(false)
        setShowBetSlipOverlay(false)
        break
      default:
        setActivePanel('home')
        setShowSportsOverlay(false)
        setShowBetSlipOverlay(false)
        break
    }
  }

  const closeMobileOverlays = () => {
    setShowSportsOverlay(false)
    setShowBetSlipOverlay(false)
  }

  return (
    <BettingProvider>
      <div className="flex flex-col h-screen bg-background text-foreground">
        {/* Header */}
        <HeaderNavbar 
          onToggleLeftPanel={toggleLeftPanel}
          onToggleRightPanel={toggleRightPanel}
          showLeftPanel={showLeftPanel}
          showRightPanel={showRightPanel}
        />

        {/* Main Content */}
        <div className="flex flex-1 min-h-0">
          {!isMobile ? (
            // Desktop three-panel layout
            <div className="flex flex-1">
              {/* Left Panel */}
              {showLeftPanel && (
                <div className="flex-shrink-0 border-r bg-card" style={{ width: leftPanelWidth }}>
                  <SideNavPanel />
                </div>
              )}

              {/* Center Panel */}
              <div className="flex-1 min-w-0">
                <WorkspacePanel />
              </div>

              {/* Right Panel */}
              {showRightPanel && (
                <div className="flex-shrink-0 border-l bg-card" style={{ width: rightPanelWidth }}>
                  <ActionHubPanel />
                </div>
              )}
            </div>
          ) : (
            // Mobile layout
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
          )}
        </div>

        {/* Toast notifications */}
        <Toaster
          toastOptions={{
            style: {
              background: 'var(--card)',
              border: '1px solid var(--border)',
              color: 'var(--foreground)'
            }
          }}
        />
      </div>
    </BettingProvider>
  )
}

export default App