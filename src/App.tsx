import { useState } from 'react'
import { Toaster } from 'sonner'
import { BettingProvider } from '@/contexts/BettingContext'
import { WorkspacePanel } from '@/components/WorkspacePanel'
import { SideNavPanel } from '@/components/SideNavPanel'
import { ActionHubPanel } from '@/components/ActionHubPanel'
import { MobileOverlay } from '@/components/MobileOverlay'
import { MobileBottomNav } from '@/components/MobileBottomNav'
import { useMediaQuery } from '@/hooks/useMediaQuery'

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

  // Desktop panel toggle handlers
  const toggleLeftPanel = () => setShowLeftPanel(!showLeftPanel)
  const toggleRightPanel = () => setShowRightPanel(!showRightPanel)

  return (
    <BettingProvider>
      <div className="min-h-screen bg-background text-foreground">
        {isMobile ? (
          // Mobile Experience
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
          // Desktop Experience - Three Panel Layout with Smooth Resizing
          <div className="h-screen overflow-hidden">
            <div 
              className={`grid h-full transition-all duration-300 ease-out ${
                showLeftPanel && showRightPanel 
                  ? 'grid-cols-[320px,1fr,380px]' 
                  : showLeftPanel && !showRightPanel 
                  ? 'grid-cols-[320px,1fr,0px]' 
                  : !showLeftPanel && showRightPanel 
                  ? 'grid-cols-[0px,1fr,380px]' 
                  : 'grid-cols-[0px,1fr,0px]'
              }`}
            >
              {/* Left Panel - Sports Navigation */}
              <div className={`border-r border-border bg-card overflow-hidden transition-all duration-300 ${
                showLeftPanel ? 'opacity-100' : 'opacity-0'
              }`}>
                {showLeftPanel && <SideNavPanel />}
              </div>

              {/* Center Panel - Main Workspace */}
              <div className="flex flex-col min-w-0 bg-background">
                <WorkspacePanel
                  isMobile={false}
                  onToggleLeftPanel={toggleLeftPanel}
                  onToggleRightPanel={toggleRightPanel}
                />
              </div>

              {/* Right Panel - Action Hub */}
              <div className={`border-l border-border bg-card overflow-hidden transition-all duration-300 ${
                showRightPanel ? 'opacity-100' : 'opacity-0'
              }`}>
                {showRightPanel && <ActionHubPanel />}
              </div>
            </div>
          </div>
        )}

        <Toaster position="top-right" />
      </div>
    </BettingProvider>
  )
}