import { useKV } from '@github/spark/hooks'

interface PanelState {
  showLeftPanel: boolean
  showRightPanel: boolean
  leftPanelWidth: number
  rightPanelWidth: number
}

export function usePanelState() {
  const [showLeftPanel, setShowLeftPanel] = useKV<boolean>('left-panel-visible', true)
  const [showRightPanel, setShowRightPanel] = useKV<boolean>('right-panel-visible', true)
  const [leftPanelWidth, setLeftPanelWidth] = useKV<number>('left-panel-width', 300)
  const [rightPanelWidth, setRightPanelWidth] = useKV<number>('right-panel-width', 300)

  const toggleLeftPanel = () => setShowLeftPanel(prev => !prev)
  const toggleRightPanel = () => setShowRightPanel(prev => !prev)

  return {
    showLeftPanel: showLeftPanel ?? true,
    showRightPanel: showRightPanel ?? true,
    leftPanelWidth: leftPanelWidth ?? 300,
    rightPanelWidth: rightPanelWidth ?? 300,
    toggleLeftPanel,
    toggleRightPanel,
    setShowLeftPanel,
    setShowRightPanel,
    setLeftPanelWidth,
    setRightPanelWidth
  }
}