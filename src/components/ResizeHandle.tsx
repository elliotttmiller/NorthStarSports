import { useState, useCallback, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface ResizeHandleProps {
  side: 'left' | 'right'
  onResize: (width: number) => void
  currentWidth: number
  minWidth?: number
  maxWidth?: number
  className?: string
}

export function ResizeHandle({ 
  side, 
  onResize, 
  currentWidth,
  minWidth = 250, 
  maxWidth = 500, 
  className = '' 
}: ResizeHandleProps) {
  const [isResizing, setIsResizing] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const startPosRef = useRef(0)
  const startWidthRef = useRef(currentWidth)

  // Update start width when currentWidth changes
  useEffect(() => {
    if (!isResizing) {
      startWidthRef.current = currentWidth
    }
  }, [currentWidth, isResizing])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsResizing(true)
    startPosRef.current = e.clientX
    startWidthRef.current = currentWidth
    
    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault()
      const diff = side === 'left' 
        ? e.clientX - startPosRef.current
        : startPosRef.current - e.clientX
      
      const newWidth = Math.max(minWidth, Math.min(maxWidth, startWidthRef.current + diff))
      onResize(newWidth)
    }

    const handleMouseUp = (e: MouseEvent) => {
      e.preventDefault()
      setIsResizing(false)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }, [side, minWidth, maxWidth, onResize, currentWidth])

  return (
    <motion.div
      className={`absolute top-0 bottom-0 w-1.5 cursor-col-resize group z-20 ${
        side === 'left' ? 'right-0' : 'left-0'
      } ${className}`}
      onMouseDown={handleMouseDown}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      animate={{
        backgroundColor: isResizing 
          ? 'var(--accent)' 
          : isHovering 
            ? 'var(--muted-foreground)' 
            : 'transparent'
      }}
      transition={{ duration: 0.15 }}
    >
      {/* Visual indicator */}
      <motion.div
        className={`absolute inset-0 bg-accent/20 ${side === 'left' ? 'rounded-r-full' : 'rounded-l-full'}`}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{
          scaleY: isHovering || isResizing ? 0.6 : 0,
          opacity: isHovering || isResizing ? 1 : 0
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
      
      {/* Drag indicator dots */}
      <motion.div 
        className={`absolute top-1/2 -translate-y-1/2 ${
          side === 'left' ? '-right-2' : '-left-2'
        } flex flex-col gap-0.5`}
        animate={{
          opacity: isHovering || isResizing ? 1 : 0,
          scale: isHovering || isResizing ? 1 : 0.8
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-0.5 h-0.5 bg-muted-foreground rounded-full" />
        <div className="w-0.5 h-0.5 bg-muted-foreground rounded-full" />
        <div className="w-0.5 h-0.5 bg-muted-foreground rounded-full" />
        <div className="w-0.5 h-0.5 bg-muted-foreground rounded-full" />
        <div className="w-0.5 h-0.5 bg-muted-foreground rounded-full" />
      </motion.div>
    </motion.div>
  )
}