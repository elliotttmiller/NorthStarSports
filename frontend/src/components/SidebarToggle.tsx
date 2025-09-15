import { motion, AnimatePresence } from 'framer-motion'
import { CaretLeft, CaretRight, List } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SidebarToggleProps {
  side: 'left' | 'right'
  isOpen: boolean
  onToggle: () => void
  className?: string
}

export function SidebarToggle({ side, isOpen, onToggle, className }: SidebarToggleProps) {
  const isLeft = side === 'left'
  
  return (
    <motion.div
      className={cn(
        'fixed top-1/2 -translate-y-1/2 z-40',
        isLeft 
          ? `transition-all duration-[350ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
              isOpen ? 'left-[308px]' : 'left-2'
            }` 
          : `transition-all duration-[350ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
              isOpen ? 'right-[358px]' : 'right-2'
            }`,
        className
      )}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      <Button
        variant="secondary"
        size="icon"
        onClick={onToggle}
        className={cn(
          'w-12 h-12 rounded-full shadow-lg border border-accent/40',
          'bg-card/40 hover:bg-accent/80 hover:border-accent/80',
          'transition-all duration-300 hover:scale-110 hover:shadow-2xl',
          'opacity-60 hover:opacity-100',
          'backdrop-blur-md',
          'ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
        )}
        style={{
          boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)',
          transition: 'background 0.2s, border 0.2s, box-shadow 0.2s, opacity 0.2s, transform 0.2s',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isOpen ? 'open' : 'closed'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isLeft ? (
              isOpen ? <CaretLeft size={18} /> : <CaretRight size={18} />
            ) : (
              isOpen ? <CaretRight size={18} /> : <CaretLeft size={18} />
            )}
          </motion.div>
        </AnimatePresence>
      </Button>
      {/* Tooltip indicator */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 5 }}
            transition={{ delay: 1 }}
            className={cn(
              'absolute top-full mt-2 px-2 py-1 text-xs text-card-foreground',
              'bg-card/90 backdrop-blur-sm border border-border/50 rounded-md',
              'pointer-events-none select-none shadow-lg',
              isLeft ? 'left-0' : 'right-0'
            )}
          >
            {isLeft ? 'Sports' : 'Bet Slip'}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

interface MobileSidebarToggleProps {
  panel: 'navigation' | 'betslip'
  isActive: boolean
  onToggle: () => void
}

export function MobileSidebarToggle({ panel, isActive, onToggle }: MobileSidebarToggleProps) {
  return (
    <motion.div
      className="fixed bottom-20 right-4 z-50 lg:hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Button
        variant={isActive ? "default" : "secondary"}
        size="icon"
        onClick={onToggle}
        className={cn(
          'w-12 h-12 rounded-full shadow-lg border border-border/50',
          'bg-card/90 backdrop-blur-sm transition-all duration-300',
          isActive && 'bg-accent text-accent-foreground'
        )}
      >
        <List size={20} />
      </Button>
    </motion.div>
  )
}