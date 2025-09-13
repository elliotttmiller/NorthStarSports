import React from 'react'


// Compone
import { SideNavPanel } from './components/SideNavPanel'

import { Mobi
// Hooks
import { usePanelState, ActivePanel } from './hooks/useP

  const isMobile = useIsMobile()
    showLeftPanel,
    toggleLeftPanel,

    setS
    activePanel,

  // Enable keyb
    onToggleLeftPanel: toggleLef
  
  })
  const handleMobileNavigation = (panel: ActivePanel) => {
      case 'sports':
  
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
          showRightPa

        <div className
            <>
              <div className="flex flex-col flex-1">
                <div className="flex-1 min-h-0">
                </div>
                {/* Mobile Sports Overlay
          

                  <SideNavPanel /

                <Mobile
              
                >
                </MobileOverlay>
                {/* Mobile Bottom Navigatio
                  activePanel={activePanel}
                />
            </>

              {/* Left Panel */}
                <div className
                </div>

              <div className="fl
              </d
              {/* Right Panel */}
                <div className="

            </>
        </div>
        {/* Toast notifications */}
      </div>
  )











































