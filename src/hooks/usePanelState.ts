import { useKV } from '@github/spark/hooks'

interface PanelState {
  showLeftPanel: boolean
  showRightPanel: boolean
}

export function usePanelState() {
  const [showLeftPanel, setShowLeftPanel] = useKV<boolean>('left-panel-visible', true)
  const [showRightPanel, setShowRightPanel] = useKV<boolean>('right-panel-visible', true)

  const toggleLeftPanel = () => setShowLeftPanel(prev => !prev)
  const toggleRightPanel = () => setShowRightPanel(prev => !prev)

  return {
    showLeftPanel: showLeftPanel ?? true,
    showRightPanel: showRightPanel ?? true,
    toggleLeftPanel,
    toggleRightPanel,
    setShowLeftPanel,
    setShowRightPanel
  }
}