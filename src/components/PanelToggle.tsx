import React from 'react'
import { motion, AnimatePresence } from 'framer
import { motion, AnimatePresence } from 'framer-motion'
import { 

  isOpen: boo
  side: 'l
  onTogglePin?: () => void

export function PanelToggle(
  onToggle, 
  className = '',
  isPinned = false,
  const isLeft = sid
  return (
      isLeft ? 'left
 

        whileTap={{ scale: 0.9
      >
          va
        
          title={
          <mot
              rotat
            }}
              rotate: { duration
  
          
        </Button>

      <AnimatePresence>
      
            animate={{ opacity: 
            trans
            whileTap={{ scale: 0.95 
            <Button
              size="sm"
       
               
              }`}
            >
                animate={{ 
                  scale: [1, 1.1, 1]
                transition={{ 
         
              >
              </motion.
          </motion.div>
      </AnimatePresence>
  )





















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