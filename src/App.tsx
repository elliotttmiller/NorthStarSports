import React, { useState } from 'react'
import { Toaster } from 'sonner'

// Context
import { BettingProvider } from '@/contexts/BettingContext'

// Components
import { WorkspacePanel } from '@/components/WorkspacePanel'
import { SideNavPanel } from '@/components/SideNavPanel'
import { ActionHubPanel } from '@/components/ActionHubPanel'
import { MobileOverlay } from '@/components/MobileOverlay'
import { MobileBottomNav } from '@/components/MobileBottomNav'

// Hooks
import { useMediaQuery } from '@/hooks/useMediaQuery'

// Types
type MobilePanelType = 'sports' | 'betslip' | null

export default function App() {
  const isMobile = useMediaQuery('(max-width: 1023px)')
  
  // Desktop panel visibility states
  const [showLeftPanel, setShowLeftPanel] = useState(true)
  const [showRightPanel, setShowRightPanel] = useState(true)
  
  // Mobile overlay states
  const [activeMobilePanel, setActiveMobilePanel] = useState<MobilePanelType>(null)

  const closeMobileOverlay = () => {
    setActiveMobilePanel(null)
  }

  const handleMobileNavigation = (panel: string) => {
    switch (panel) {
      case 'sports':
        setActiveMobilePanel('sports')
        break
      case 'betslip':
        setActiveMobilePanel('betslip')
        break
      default:
        setActiveMobilePanel(null)
    }
  }

  return (
    <BettingProvider>
      <div className="min-h-screen bg-background text-foreground">
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
              <div className={`flex flex-col ${!showLeftPanel ? 'col-start-1' : ''} ${!showRightPanel ? 'col-end-4' : ''}`}>
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

        <Toaster position="top-right" />
      </div>
    </BettingProvider>
  )
}