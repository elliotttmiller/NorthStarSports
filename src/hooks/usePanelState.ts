import { useKV } from '@github/spark/hooks'
import { useState } from 'react'

export type ActivePanel = 'home' | 'sports' | 'betslip' | 'profile'

export function usePanelState() {
  // Desktop panel state (persisted)
  const [showLeftPanel, setShowLeftPanel] = useKV<boolean>('left-panel-visible', true)
  const [showRightPanel, setShowRightPanel] = useKV<boolean>('right-panel-visible', true)
  const [leftPanelWidth, setLeftPanelWidth] = useKV<number>('left-panel-width', 300)
  const [rightPanelWidth, setRightPanelWidth] = useKV<number>('right-panel-width', 300)

  // Mobile overlay state (not persisted - session only)
  const [showSportsOverlay, setShowSportsOverlay] = useState(false)
  const [showBetSlipOverlay, setShowBetSlipOverlay] = useState(false)
  const [activePanel, setActivePanel] = useState<ActivePanel>('home')

  // Use functional updates to avoid stale closure issues
  const toggleLeftPanel = () => {
    setShowLeftPanel((prev) => !prev)
  }
  
  const toggleRightPanel = () => {
    setShowRightPanel((prev) => !prev)
  }

  return {
    // Desktop panels
    showLeftPanel: showLeftPanel ?? true,
    showRightPanel: showRightPanel ?? true,
    leftPanelWidth: leftPanelWidth ?? 300,
    rightPanelWidth: rightPanelWidth ?? 300,
    toggleLeftPanel,
    toggleRightPanel,
    setShowLeftPanel,
    setShowRightPanel,
    setLeftPanelWidth,
    setRightPanelWidth,
    
    // Mobile overlays
    showSportsOverlay,
    showBetSlipOverlay,
    setShowSportsOverlay,
    setShowBetSlipOverlay,
    activePanel,
    setActivePanel
  }
}