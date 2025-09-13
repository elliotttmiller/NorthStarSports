import { Trophy, Clock, X } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

interface OpenBet {
  id: string
  type: 'single' | 'parlay'
  status: 'pending' | 'won' | 'lost'
  stake: number
  potentialWin: number
  teams: string[]
  odds: string
  date: string
}

const sampleOpenBets: OpenBet[] = [
  {
    id: '1',
    type: 'single',
    status: 'pending',
    stake: 100,
    potentialWin: 90.91,
    teams: ['Patriots +1.5'],
    odds: '-110',
    date: '2 hours ago'
  },
  {
    id: '2', 
    type: 'parlay',
    status: 'won',
    stake: 50,
    potentialWin: 325.50,
    teams: ['Dolphins -1.5', 'Over 43.5', 'Ravens -11.5'],
    odds: '+651',
    date: '1 day ago'
  },
  {
    id: '3',
    type: 'single',
    status: 'lost',
    stake: 75,
    potentialWin: 157.50,
    teams: ['Cowboys ML'],
    odds: '+210',
    date: '3 days ago'
  }
]

export function MyBets() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'won':
        return <Trophy className="w-4 h-4 text-accent" />
      case 'pending':
        return <Clock className="w-4 h-4 text-blue-500" />
      case 'lost':
        return <X className="w-4 h-4 text-destructive" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'won':
        return <Badge className="bg-accent text-accent-foreground">Won</Badge>
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>
      case 'lost':
        return <Badge variant="destructive">Lost</Badge>
      default:
        return null
    }
  }

  if (sampleOpenBets.length === 0) {
    return (
      <div className="p-4 flex flex-col items-center justify-center flex-1 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Trophy className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No Bets History</h3>
        <p className="text-sm text-muted-foreground">
          Your placed bets will appear here
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-2 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Recent Bets</h3>
          <Button variant="ghost" size="sm" className="text-xs">
            View All
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-3">
        {sampleOpenBets.map((bet) => (
          <Card key={bet.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                {getStatusIcon(bet.status)}
                <span className="text-sm font-medium capitalize">
                  {bet.type} Bet
                </span>
                {getStatusBadge(bet.status)}
              </div>
              <span className="text-xs text-muted-foreground">{bet.date}</span>
            </div>

            <div className="space-y-2 mb-3">
              {bet.teams.map((team, index) => (
                <div key={index} className="text-sm">
                  <span className="font-medium">{team}</span>
                </div>
              ))}
            </div>

            <Separator className="mb-3" />

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground block">Risk</span>
                <span className="font-medium">{formatCurrency(bet.stake)}</span>
              </div>
              <div>
                <span className="text-muted-foreground block">Odds</span>
                <span className="font-medium font-mono">{bet.odds}</span>
              </div>
              <div>
                <span className="text-muted-foreground block">
                  {bet.status === 'won' ? 'Won' : 'To Win'}
                </span>
                <span className={`font-medium ${
                  bet.status === 'won' ? 'text-accent' : 
                  bet.status === 'lost' ? 'text-destructive' : 'text-foreground'
                }`}>
                  {formatCurrency(bet.potentialWin)}
                </span>
              </div>
            </div>

            {bet.status === 'pending' && (
              <div className="mt-3 pt-3 border-t">
                <Button variant="outline" size="sm" className="w-full">
                  Cash Out Available
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>

      <div className="p-4 border-t">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center">
            <div className="text-lg font-semibold text-accent">$473.41</div>
            <div className="text-muted-foreground">Total Won</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">$225</div>
            <div className="text-muted-foreground">Total Risked</div>
          </div>
        </div>
      </div>
    </div>
  )
}