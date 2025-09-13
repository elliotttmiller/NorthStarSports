import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface PropBuilderProps {
  className?: string
}

export function PropBuilder({ className }: PropBuilderProps) {
  return (
    <Card className={cn("flex flex-col h-full", className)}>
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Prop Builder</h2>
            <p className="text-sm text-muted-foreground">Create custom proposition bets</p>
          </div>
          <Badge variant="secondary">Coming Soon</Badge>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <h3 className="text-xl font-semibold text-muted-foreground">Prop Builder</h3>
          <p className="text-muted-foreground">
            Advanced prop betting tools are coming soon. Build complex proposition bets with multiple conditions and enhanced odds.
          </p>
          <Button variant="outline" disabled>
            Access Prop Builder
          </Button>
        </div>
      </div>
    </Card>
  )
}