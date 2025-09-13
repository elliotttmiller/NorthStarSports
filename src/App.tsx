import React, { useState } from 'react'
import { Toaster } from 'sonner'

// Context Providers
import { BettingProvider } from '@/contexts/BettingContext'

// Components
import { SideNavPanel } from '@/components/SideNavPanel'
import { WorkspacePanel } from '@/components/WorkspacePanel'
import { ActionHubPanel } from '@/components/ActionHubPanel'
import { MobileBottomNav } from '@/components/MobileBottomNav'
import { MobileOverlay } from '@/components/MobileOverlay'

// Hooks
import { useMediaQuery } from '@/hooks/useMediaQuery'

// Types
type MobilePanel = 'sports' | 'betslip' | null

export default function App() {
  const isMobile = useMediaQuery('(max-width: 1023px)')
  
  // Mobile overlay states
  const [activeMobilePanel, setActiveMobilePanel] = useState<MobilePanel>(null)
  
  // Desktop panel visibility
  const [showLeftPanel, setShowLeftPanel] = useState(true)
  const [showRightPanel, setShowRightPanel] = useState(true)

  const handleMobileNavigation = (panel: 'home' | 'sports' | 'betslip') => {
    switch (panel) {
      case 'sports':
        setActiveMobilePanel('sports')
        break
      case 'betslip':
        setActiveMobilePanel('betslip')
        break
      case 'home':
        setActiveMobilePanel(null)
        break
    }
  }

  const closeMobileOverlay = () => {
    setActiveMobilePanel(null)
  }

  return (
    <BettingProvider>
      <div className="min-h-screen bg-background">
        {isMobile ? (
          <>
            {/* Mobile Experience */}
            <div className="flex flex-col h-screen">
              {/* Main Content Area */}
              <div className="flex-1 min-h-0">
                <WorkspacePanel 
                  isMobile={true}
                  onToggleLeftPanel={() => setActiveMobilePanel('sports')}
                  onToggleRightPanel={() => setActiveMobilePanel('betslip')}
                />
              </div>

              {/* Mobile Sports Overlay */}
              <MobileOverlay
                isOpen={activeMobilePanel === 'sports'}
                onClose={closeMobileOverlay}
                side="left"
              >
                <SideNavPanel />
              </MobileOverlay>

              {/* Mobile Bet Slip Overlay */}
              <MobileOverlay
                isOpen={activeMobilePanel === 'betslip'}
                onClose={closeMobileOverlay}
                side="right"
              >
                <ActionHubPanel />
              </MobileOverlay>

              {/* Mobile Bottom Navigation */}
              <MobileBottomNav
                onNavigate={handleMobileNavigation}
                activePanel={activeMobilePanel === 'sports' ? 'sports' : activeMobilePanel === 'betslip' ? 'betslip' : 'home'}
              />
            </div>
          </>
        ) : (
          <>
            {/* Desktop Experience - Three Panel Layout */}
            <div className="grid grid-cols-[320px,1fr,380px] h-screen">
              {/* Left Panel - Sports Navigation */}
              {showLeftPanel && (
                <div className="border-r border-border bg-card">
                  <SideNavPanel />
                </div>
              )}

              {/* Center Panel - Main Workspace */}
              <div className={`flex flex-col ${showLeftPanel ? '' : 'col-span-1'} ${showRightPanel ? '' : 'col-span-1'}`}>
                <WorkspacePanel
                  isMobile={false}
                  onToggleLeftPanel={() => setShowLeftPanel(!showLeftPanel)}
                  onToggleRightPanel={() => setShowRightPanel(!showRightPanel)}
                />
              </div>

              {/* Right Panel - Action Hub */}
              {showRightPanel && (
                <div className="border-l border-border bg-card">
                  <ActionHubPanel />
                </div>
              )}
            </div>
          </>
        )}

        {/* Global Toast Notifications */}
        <Toaster position="top-right" />
      </div>
    </BettingProvider>
  )
}