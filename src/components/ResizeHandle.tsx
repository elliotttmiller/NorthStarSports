import React, { useState, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'

interface ResizeHandleProps {
  side: 'left' | 'right'
  onResize: (width: number) => void
  minWidth?: number
  maxWidth?: number
  className?: string
}

export function ResizeHandle({ 
  side, 
  onResize, 
  minWidth = 250, 
  maxWidth = 400, 
  className = '' 
}: ResizeHandleProps) {
  const [isResizing, setIsResizing] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const startPosRef = useRef(0)
  const startWidthRef = useRef(300)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
    startPosRef.current = e.clientX
    
    const handleMouseMove = (e: MouseEvent) => {
      const diff = side === 'left' 
        ? e.clientX - startPosRef.current
        : startPosRef.current - e.clientX
      
      const newWidth = Math.max(minWidth, Math.min(maxWidth, startWidthRef.current + diff))
      onResize(newWidth)
    }

    const handleMouseUp = () => {
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
  }, [side, minWidth, maxWidth, onResize])

  return (
    <motion.div
      className={`absolute top-0 bottom-0 w-1 cursor-col-resize group z-20 ${
        side === 'left' ? 'right-0' : 'left-0'
      } ${className}`}
      onMouseDown={handleMouseDown}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      animate={{
        backgroundColor: isResizing 
          ? 'var(--accent)' 
          : isHovering 
            ? 'var(--accent)' 
            : 'transparent'
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Visual indicator */}
      <motion.div
        className="absolute inset-0 bg-accent/20 rounded-full"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{
          scaleY: isHovering || isResizing ? 1 : 0,
          opacity: isHovering || isResizing ? 1 : 0
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
      
      {/* Drag indicator dots */}
      <div className={`absolute top-1/2 -translate-y-1/2 ${side === 'left' ? '-right-1' : '-left-1'} flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
        <div className="w-1 h-1 bg-accent rounded-full" />
        <div className="w-1 h-1 bg-accent rounded-full" />
        <div className="w-1 h-1 bg-accent rounded-full" />
      </div>
    </motion.div>
  )
}