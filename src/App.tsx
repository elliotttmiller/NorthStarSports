import { useState } from 'react'
import { BettingProvider } from './contexts/BettingContext'
import { SideNavPanel } from './components/SideNavPanel'
import { WorkspacePanel } from './components/WorkspacePanel'
import { ActionHubPanel } from './components/ActionHubPanel'
import { MobileBottomNav } from './components/MobileBottomNav'
import { MobileOverlay } from './components/MobileOverlay'
import { useIsMobile } from './hooks/useIsMobile'
import { Toaster } from '@/components/ui/sonner'

function App() {
  const isMobile = useIsMobile()
  const [activeMobilePanel, setActiveMobilePanel] = useState('workspace')
  const [showMobileNav, setShowMobileNav] = useState(false)
  const [showMobileBetSlip, setShowMobileBetSlip] = useState(false)

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
          <div className="flex-1 grid grid-cols-12 gap-0 min-h-0">
            {/* Left Panel - Navigation */}
            <div className="col-span-3 min-h-0">
              <SideNavPanel className="h-full" />
            </div>

            {/* Center Panel - Workspace */}
            <div className="col-span-6 min-h-0">
              <WorkspacePanel className="h-full" />
            </div>

            {/* Right Panel - Action Hub */}
            <div className="col-span-3 min-h-0">
              <ActionHubPanel className="h-full" />
            </div>
          </div>
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