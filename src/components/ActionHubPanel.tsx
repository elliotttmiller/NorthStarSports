import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BetSlip } from './BetSlip'
import { MyBets } from './MyBets'
import { useBetSlip } from '@/hooks'
import { cn } from '@/lib/utils'

interface ActionHubPanelProps {
  className?: string
}

export function ActionHubPanel({ className }: ActionHubPanelProps) {
  const { rightPanelTab, setRightPanelTab, bets } = useBetSlip()

  return (
    <Card className={cn("flex flex-col h-full bg-card border-l", className)}>
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Bet Slip</h2>
          {bets.length > 0 && (
            <Badge variant="default" className="bg-accent text-accent-foreground">
              {bets.length}
            </Badge>
          )}
        </div>
      </div>

      <Tabs 
        value={rightPanelTab} 
        onValueChange={(value) => setRightPanelTab(value as 'betslip' | 'mybets')}
        className="flex flex-col flex-1"
      >
        <TabsList className="mx-4 mt-2">
          <TabsTrigger value="betslip" className="flex-1">
            Bet Slip
            {bets.length > 0 && (
              <Badge variant="secondary" className="ml-2 px-1.5 py-0.5 text-xs">
                {bets.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="mybets" className="flex-1">My Bets</TabsTrigger>
        </TabsList>

        <TabsContent value="betslip" className="flex-1 mt-2">
          <BetSlip />
        </TabsContent>

        <TabsContent value="mybets" className="flex-1 mt-2">
          <MyBets />
        </TabsContent>
      </Tabs>
    </Card>
  )
}