import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { CaretLeft, CaretRight, PushPin } from '@phosphor-icons/react'

interface PanelToggleProps {
  isOpen: boolean
  side: 'left' | 'right'
  onToggle: () => void
  className?: string
  isPinned?: boolean
  onTogglePin?: () => void
}

export function PanelToggle({
  isOpen,
  side,
  onToggle, 
  className = '',
  isPinned = false,
  onTogglePin
}: PanelToggleProps) {
  const isLeft = side === 'left'
  
  return (
    <div className={`absolute ${isLeft ? 'left-2' : 'right-2'} top-4 z-10 ${className}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="h-8 w-8 p-0 rounded-full bg-background/60 backdrop-blur-sm border border-border/30 shadow-sm hover:shadow-md transition-all duration-200 hover:bg-background/80 hover:border-border/50"
          title={isOpen ? `Hide ${side} panel` : `Show ${side} panel`}
        >
          <motion.div
            animate={{ 
              rotate: isOpen ? (isLeft ? 180 : 0) : (isLeft ? 0 : 180)
            }}
            transition={{ duration: 0.2 }}
          >
            {isLeft ? <CaretLeft size={14} /> : <CaretRight size={14} />}
          </motion.div>
        </Button>
      </motion.div>

      <AnimatePresence>
        {onTogglePin && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="absolute top-10 left-1/2 transform -translate-x-1/2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={onTogglePin}
              className={`h-8 w-8 p-0 rounded-full bg-background/60 backdrop-blur-sm border border-border/30 shadow-sm hover:shadow-md transition-all duration-200 hover:bg-background/80 hover:border-border/50 ${
                isPinned 
                  ? 'text-accent border-accent/30 bg-accent/10' 
                  : 'text-muted-foreground'
              }`}
              title={isPinned ? 'Unpin panel' : 'Pin panel open'}
            >
              <motion.div
                animate={{ 
                  rotate: isPinned ? 0 : 45,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 0.3,
                  scale: { duration: 0.4, times: [0, 0.6, 1] }
                }}
              >
                <PushPin size={14} />
              </motion.div>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}