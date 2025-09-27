'use client'

import { useState, useRef, useEffect } from 'react'
import { useBetSlipStore } from '@/store/bet-slip'
import { useMobileStore } from '@/store/mobile-state'
import { FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function FloatingBetSlipButton() {
  const { selections } = useBetSlipStore()
  const { toggleBetSheet } = useMobileStore()
  const selectionsArray = Object.values(selections)
  
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: window.innerWidth - 80, y: window.innerHeight - 160 })
  const buttonRef = useRef<HTMLDivElement>(null)
  const dragStartRef = useRef({ x: 0, y: 0 })
  const hasMoved = useRef(false)

  // Handle drag start
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    setIsDragging(true)
    hasMoved.current = false
    
    let clientX: number, clientY: number;
    if ('touches' in e && e.touches && e.touches.length > 0) {
      clientX = e.touches?.[0]?.clientX ?? 0;
      clientY = e.touches?.[0]?.clientY ?? 0;
    } else if ('clientX' in e && 'clientY' in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else {
      clientX = 0;
      clientY = 0;
    }
    
    dragStartRef.current = {
      x: clientX - position.x,
      y: clientY - position.y
    }
  }

  // Handle drag move
  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return
    
    let clientX: number, clientY: number;
    if ('touches' in e && e.touches && e.touches.length > 0) {
      clientX = e.touches?.[0]?.clientX ?? 0;
      clientY = e.touches?.[0]?.clientY ?? 0;
    } else if ('clientX' in e && 'clientY' in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else {
      clientX = 0;
      clientY = 0;
    }
    
    const newX = clientX - dragStartRef.current.x
    const newY = clientY - dragStartRef.current.y
    
    // Constrain to viewport bounds
    const maxX = window.innerWidth - 60
    const maxY = window.innerHeight - 140 // Account for bottom nav
    
    const constrainedX = Math.max(10, Math.min(maxX, newX))
    const constrainedY = Math.max(80, Math.min(maxY, newY)) // Account for header
    
    setPosition({ x: constrainedX, y: constrainedY })
    hasMoved.current = true
  }

  // Handle drag end
  const handleDragEnd = () => {
    setIsDragging(false)
  }

  // Handle click (only if not dragged)
  const handleClick = () => {
    if (!hasMoved.current && !isDragging) {
      toggleBetSheet()
    }
  }

  // Add event listeners
  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e: MouseEvent) => handleDragMove(e)
      const handleTouchMove = (e: TouchEvent) => {
        e.preventDefault()
        handleDragMove(e)
      }
      const handleMouseUp = () => handleDragEnd()
      const handleTouchEnd = () => handleDragEnd()

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('touchend', handleTouchEnd)

      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [isDragging])

  // Don't show if no selections
  if (selectionsArray.length === 0) return null

  return (
      <div
        ref={buttonRef}
        className={cn(
          'floating-bet-slip-button',
          isDragging ? 'scale-110' : 'hover:scale-105',
          'flex items-center justify-center'
        )}
        data-x={position.x}
        data-y={position.y}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        onClick={handleClick}
      >
        <div className="relative">
          <FileText className="h-6 w-6 text-white" />
          {/* Selection count badge */}
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">{selectionsArray.length}</span>
          </div>
        </div>
      </div>
  )
}