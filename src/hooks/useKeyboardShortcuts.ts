import { useEffect } from 'react'

export function useKeyboardShortcuts({
  onToggleLeftPanel,
  onToggleRightPanel,
}: {
  onToggleLeftPanel: () => void
  onToggleRightPanel: () => void
}) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle shortcuts when no input is focused
      const activeElement = document.activeElement as HTMLElement
      if (
        activeElement?.tagName === 'INPUT' ||
        activeElement?.tagName === 'TEXTAREA' ||
        activeElement?.contentEditable === 'true'
      ) {
        return
      }

      // Cmd/Ctrl + [ for left panel toggle
      if ((event.metaKey || event.ctrlKey) && event.key === '[') {
        event.preventDefault()
        onToggleLeftPanel()
      }

      // Cmd/Ctrl + ] for right panel toggle  
      if ((event.metaKey || event.ctrlKey) && event.key === ']') {
        event.preventDefault()
        onToggleRightPanel()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onToggleLeftPanel, onToggleRightPanel])
}