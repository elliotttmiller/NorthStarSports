import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  CaretLeft, 
  CaretRight,
  PushPin,
  PushPinSlash
} from '@phosphor-icons/react'

interface PanelToggleProps {
  isOpen: boolean
  onToggle: () => void
  side: 'left' | 'right'
  className?: string
  isPinned?: boolean
  onTogglePin?: () => void
}

export function PanelToggle({ 
  isOpen, 
  onToggle, 
  side, 
  className = '',
  isPinned = false,
  onTogglePin 
}: PanelToggleProps) {
  const Icon = side === 'left' 
    ? (isOpen ? CaretLeft : CaretRight)
    : (isOpen ? CaretRight : CaretLeft)

  return (
    <div className={`absolute top-4 ${side === 'left' ? 'left-2' : 'right-2'} z-10 flex flex-col gap-2 ${className}`}>
      {/* Main toggle button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className={`h-8 w-8 p-0 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 shadow-lg transition-all duration-300 hover:bg-muted/80 hover:border-border hover:shadow-xl ${
            isOpen ? 'opacity-100' : 'opacity-40 hover:opacity-100'
          }`}
          title={`${isOpen ? 'Hide' : 'Show'} ${side === 'left' ? 'Navigation' : 'Bet Slip'}`}
        >
          <motion.div
            animate={{ 
              rotate: isOpen ? 0 : 180,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 0.3, 
              ease: [0.4, 0.0, 0.2, 1]
            }}
          >
            <Icon size={16} />
          </motion.div>
        </Button>
      </motion.div>

      {/* Pin/Unpin button - only show when panel is open */}
      {isOpen && onTogglePin && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={onTogglePin}
            className={`h-7 w-7 p-0 rounded-full bg-background/60 backdrop-blur-sm border transition-all duration-200 ${
              isPinned 
                ? 'border-accent/50 text-accent hover:bg-accent/10' 
                : 'border-border/30 text-muted-foreground hover:bg-muted/60 hover:border-border/50'
            }`}
            title={isPinned ? 'Unpin panel' : 'Pin panel open'}
          >
            <motion.div
              animate={{ 
                rotate: isPinned ? 0 : 0,
                scale: isPinned ? 1.1 : 1
              }}
              transition={{ duration: 0.2 }}
            >
              {isPinned ? <PushPin size={12} /> : <PushPinSlash size={12} />}
            </motion.div>
          </Button>
        </motion.div>
      )}
    </div>
  )
}