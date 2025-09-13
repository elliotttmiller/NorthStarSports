import React, { useState } from 'react'


// Compone
import { SideNavPanel } from './components/SideNavPanel'

// Components
import { HeaderNavbar } from './components/HeaderNavbar'
import { SideNavPanel } from './components/SideNavPanel'
import { WorkspacePanel } from './components/WorkspacePanel'
import { ActionHubPanel } from './components/ActionHubPanel'
import { MobileOverlay } from './components/MobileOverlay'
import { MobileBottomNav } from './components/MobileBottomNav'

// Hooks
import { useIsMobile } from './hooks/useIsMobile'

function App() {
  const isMobile = useIsMobile()
  
  // Desktop panel states
  const [showLeftPanel, setShowLeftPanel] = useState(true)
  const [showRightPanel, setShowRightPanel] = useState(true)
  
  // Mobile overlay states
  const [showSportsOverlay, setShowSportsOverlay] = useState(false)
  const [showBetSlipOverlay, setShowBetSlipOverlay] = useState(false)
  const [activePanel, setActivePanel] = useState<'home' | 'sports' | 'betslip'>('home')

  const handleMobileNavigation = (panel: 'home' | 'sports' | 'betslip') => {
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
  }
  }

  return (
        <HeaderNavbar
      <div className="flex flex-col h-screen bg-background">
          showLeftPane
        <HeaderNavbar 
          onToggleLeft={() => setShowLeftPanel(!showLeftPanel)}
          onToggleRight={() => setShowRightPanel(!showRightPanel)}
          showLeftPanel={showLeftPanel}
          showRightPanel={showRightPanel}
        />

        <div className="flex flex-1 min-h-0">
              {/* Center
              
              {/* Desktop Layout */}
              {showLeftPanel && (
                <div className="flex-shrink-0 w-80 border-r bg-card">
                  <SideNavPanel />
                </div>
            </>

              {/* Center Panel */}
              <div className="flex-1 min-w-0">
                <WorkspacePanel />
                >



                <div className="flex-shrink-0 w-96 border-l bg-card">





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
                  onNavigate={handleMobileNavigation}
                />

            </>


















