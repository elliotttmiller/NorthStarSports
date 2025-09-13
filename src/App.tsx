import { useState } from 'react'
import { Toaster } from 'sonner'
import { BettingProvider } from '@/contexts/BettingContext'
import { QuickBetProvider } from '@/contexts/QuickBetContext'
import { WorkspacePanel } from '@/components/WorkspacePanel'
import { SideNavPanel } from '@/components/SideNavPanel'
import { ActionHubPanel } from '@/components/ActionHubPanel'
import { MobileOverlay } from '@/components/MobileOverlay'
import { MobileBottomNav } from '@/components/MobileBottomNav'
import { QuickBetModal } from '@/components/modals/QuickBetModal'
import { useMediaQuery } from '@/hooks'
import type { MobilePanelType } from '@/types'

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

  // Desktop panel toggle handlers
  const toggleLeftPanel = () => setShowLeftPanel(!showLeftPanel)
  const toggleRightPanel = () => setShowRightPanel(!showRightPanel)

  return (
    <BettingProvider>
      <QuickBetProvider>
        <div className="min-h-screen bg-background text-foreground">
            {isMobile ? (
              // Mobile Experience - Focused Single Panel
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
            ) : (
              // Desktop Experience - Universal Adaptive Shell with Three-Panel Studio
              <div className="h-screen overflow-hidden">
                {/* Adaptive Outline Container */}
                <div className="container-fluid h-full max-w-7xl">
                  <div 
                    className={`
                      grid h-full transition-all duration-350 ease-out panel-grid
                      ${showLeftPanel && showRightPanel 
                        ? 'grid-cols-[min(320px,25%),1fr,min(380px,28%)]' 
                        : showLeftPanel && !showRightPanel 
                        ? 'grid-cols-[min(320px,25%),1fr,0px]' 
                        : !showLeftPanel && showRightPanel 
                        ? 'grid-cols-[0px,1fr,min(380px,28%)]' 
                        : 'grid-cols-[0px,1fr,0px]'
                      }
                    `}
                  >
                    {/* Left Panel - Sports Library Navigation */}
                    <div className={`
                      border-r border-border bg-card overflow-hidden
                      transition-all duration-350 ease-out side-panel
                      ${showLeftPanel ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
                    `}>
                      {showLeftPanel && <SideNavPanel />}
                    </div>

                    {/* Center Panel - Dynamic Workspace */}
                    <div className="flex flex-col min-w-0 bg-background relative">
                      <WorkspacePanel
                        isMobile={false}
                        onToggleLeftPanel={toggleLeftPanel}
                        onToggleRightPanel={toggleRightPanel}
                      />
                    </div>

                    {/* Right Panel - Action Hub */}
                    <div className={`
                      border-l border-border bg-card overflow-hidden
                      transition-all duration-350 ease-out side-panel right
                      ${showRightPanel ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
                    `}>
                      {showRightPanel && <ActionHubPanel />}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Bet Modal - Accessible from both mobile and desktop */}
            <QuickBetModal />

            <Toaster position="top-right" />
          </div>
        </QuickBetProvider>
      </BettingProvider>
    )
}