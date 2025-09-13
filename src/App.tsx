import React, { useState } from 'react'
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
import { ActivePanel } from './hooks/usePanelState'

function App() {
  const isMobile = useIsMobile()
  
  // Desktop panel states
  const [showLeftPanel, setShowLeftPanel] = useState(true)
  const [showRightPanel, setShowRightPanel] = useState(true)
  
  // Mobile overlay states
  const [showSportsOverlay, setShowSportsOverlay] = useState(false)
  const [showBetSlipOverlay, setShowBetSlipOverlay] = useState(false)
  const [activePanel, setActivePanel] = useState<ActivePanel>('home')

  const handleMobileNavigation = (panel: 'home' | 'sports' | 'betslip' | 'profile') => {
    switch (panel) {
      case 'sports':
        setShowSportsOverlay(true)
        setActivePanel('sports')
        break
      case 'betslip':
        setShowBetSlipOverlay(true)
        setActivePanel('betslip')
        break
      case 'profile':
        // Handle profile panel if needed
        setActivePanel('profile')
        break
      case 'home':
        setShowSportsOverlay(false)
        setShowBetSlipOverlay(false)
        setActivePanel('home')
        break
    }
  }

  return (
    <BettingProvider>
      <div className="flex flex-col h-screen bg-background">
        {/* Header */}
        <HeaderNavbar 
          onToggleLeftPanel={() => setShowLeftPanel(!showLeftPanel)}
          onToggleRightPanel={() => setShowRightPanel(!showRightPanel)}
          showLeftPanel={showLeftPanel}
          showRightPanel={showRightPanel}
        />

        <div className="flex flex-1 min-h-0">
          {!isMobile ? (
            <>
              {/* Desktop Layout */}
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
          ) : (
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