import { Clock, Play, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Game {
  id: string
  homeTeam: string
  awayTeam: string
  homeScore: number | null
  awayScore: number | null
  startTime: string
  league: string
  spread: { home: number; away: number; odds: number }
  moneyline: { home: number; away: number }
  total: { over: number; under: number; odds: number }
  status: 'scheduled' | 'live' | 'final'
}

interface GameCardProps {
  game: Game
}

const statusConfig = {
  scheduled: { icon: Clock, color: 'text-ns-muted', bg: 'bg-ns-muted/20' },
  live: { icon: Play, color: 'text-ns-red', bg: 'bg-ns-red/20' },
  final: { icon: CheckCircle, color: 'text-ns-green', bg: 'bg-ns-green/20' },
}

export default function GameCard({ game }: GameCardProps) {
  const StatusIcon = statusConfig[game.status].icon
  const formatTime = new Date(game.startTime).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  })

  return (
    <div className="@container bg-ns-card border border-ns-border rounded-lg overflow-hidden hover:border-ns-blue/50 transition-colors">
      {/* Header with status and league */}
      <div className="flex items-center justify-between p-fluid-base border-b border-ns-border">
        <span className="text-fluid-sm font-medium text-ns-blue">{game.league}</span>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-fluid-xs ${statusConfig[game.status].bg}`}>
          <StatusIcon className={`w-3 h-3 ${statusConfig[game.status].color}`} />
          <span className={`capitalize ${statusConfig[game.status].color}`}>
            {game.status === 'scheduled' ? formatTime : game.status}
          </span>
        </div>
      </div>

      {/* Teams and Scores */}
      <div className="p-fluid-base space-y-fluid-sm">
        <div className="flex items-center justify-between">
          <span className="text-fluid-base font-medium line-clamp-1">{game.awayTeam}</span>
          {game.awayScore !== null && (
            <span className="text-fluid-lg font-bold">{game.awayScore}</span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-fluid-base font-medium line-clamp-1">{game.homeTeam}</span>
          {game.homeScore !== null && (
            <span className="text-fluid-lg font-bold">{game.homeScore}</span>
          )}
        </div>
      </div>

      {/* Betting Options - Responsive with container queries */}
      <div className="@container p-fluid-base border-t border-ns-border">
        <div className="grid grid-cols-1 @sm:grid-cols-3 gap-fluid-sm">
          {/* Spread */}
          <div className="text-center">
            <p className="text-fluid-xs text-ns-muted mb-1">Spread</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-fluid-sm"
            >
              {game.spread.home > 0 ? '+' : ''}{game.spread.home}
            </Button>
          </div>

          {/* Moneyline */}
          <div className="text-center">
            <p className="text-fluid-xs text-ns-muted mb-1">Moneyline</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-fluid-sm"
            >
              {game.moneyline.home > 0 ? '+' : ''}{game.moneyline.home}
            </Button>
          </div>

          {/* Total */}
          <div className="text-center">
            <p className="text-fluid-xs text-ns-muted mb-1">Total</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-fluid-sm"
            >
              O {game.total.over}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}