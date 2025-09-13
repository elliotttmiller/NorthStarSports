import { motion } from 'framer-motion'
import { 
  CaretRi
  X 
import { cn } fr
interface P
  si
  className?: string
import { cn } from '@/lib/utils'

interface PanelToggleProps {
  isOpen: boolean
  side: 'left' | 'right'
  onToggle: () => void
  className?: string
}

export function PanelToggle({ 
  isOpen, 
  side, 
  onToggle, 
  className 
}: PanelToggleProps) {
  // Icon selection based on panel side and state
  const getIcon = () => {
    if (side === 'left') {
      return isOpen ? SidebarClose : SidebarOpen
    } else {
      return isOpen ? X : Receipt
    }
  }

  const Icon = getIcon()
  
        positionClasses,
      )}
      animate={{ opac
    >

        on
          "h-9 w
          "border-bo
          "hover:shadow-
        )}
      >
        
          }}
            duration: 0.3, 
          }}
     
             
            )} 
        </motion.
    </motion.div>
}













          transition={{ 
            duration: 0.3, 
            ease: [0.4, 0.0, 0.2, 1] 
          }}
        >
          <Icon 
            className={cn(
              "w-4 h-4 transition-colors duration-200",
              isOpen ? "text-muted-foreground" : "text-foreground"
            )} 
          />
        </motion.div>
      </Button>
    </motion.div>
  )
}