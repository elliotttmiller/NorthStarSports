import { Clock, Play, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Game } from '@/types'
import Image from 'next/image'

interface GameCardProps {
  game: Game
}

const statusConfig = {
  scheduled: { icon: Clock, color: 'text-ns-muted', bg: 'bg-ns-muted/20' },
  live: { icon: Play, color: 'text-ns-red', bg: 'bg-ns-red/20' },
  final: { icon: CheckCircle, color: 'text-ns-green', bg: 'bg-ns-green/20' },
}

export default function GameCard({ game }: GameCardProps) {
  const statusRaw = game.details.status === 'Upcoming' ? 'scheduled' : game.details.status.toLowerCase()
  const validStatuses = ['scheduled', 'live', 'final'] as const;
  const statusKey: keyof typeof statusConfig = validStatuses.includes(statusRaw as keyof typeof statusConfig)
    ? (statusRaw as keyof typeof statusConfig)
    : 'scheduled'
  const StatusIcon = statusConfig[statusKey].icon
  const formatTime = new Date(game.startTime).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="@container bg-ns-card border border-ns-border rounded-lg overflow-hidden hover:border-ns-blue/50 transition-colors">
      {/* Header with status and league */}
      <div className="flex items-center justify-between p-fluid-base border-b border-ns-border">
        <span className="text-fluid-sm font-medium text-ns-blue">{game.details.league}</span>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-fluid-xs ${statusConfig[statusKey].bg}`}> 
          <StatusIcon className={`w-3 h-3 ${statusConfig[statusKey].color}`} />
          <span className={`capitalize ${statusConfig[statusKey].color}`}>{formatTime}</span>
        </div>
      </div>

      {/* Teams and Scores */}
      <div className="p-fluid-base space-y-fluid-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center min-w-0">
            <Image src={game.awayTeam.logo} alt={game.awayTeam.name} width={24} height={24} className="mr-2 align-middle object-contain" />
            <span className="text-fluid-base font-medium line-clamp-1">{game.awayTeam.name}</span>
          </div>
          <span className="text-fluid-lg font-bold">{game.awayTeam.score}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center min-w-0">
            <Image src={game.homeTeam.logo} alt={game.homeTeam.name} width={24} height={24} className="mr-2 align-middle object-contain" />
            <span className="text-fluid-base font-medium line-clamp-1">{game.homeTeam.name}</span>
          </div>
          <span className="text-fluid-lg font-bold">{game.homeTeam.score}</span>
        </div>
      </div>

      {/* Betting Options - Responsive with container queries */}
      <div className="@container p-fluid-base border-t border-ns-border">
        <div className="grid grid-cols-1 @sm:grid-cols-3 gap-fluid-sm">
          {/* Spread */}
          <div className="text-center">
            <p className="text-fluid-xs text-ns-muted mb-1">Spread</p>
            <Button variant="outline" size="sm" className="w-full text-fluid-sm">
              {game.odds.spread.home > 0 ? '+' : ''}{game.odds.spread.home}
            </Button>
          </div>
          {/* Moneyline */}
          <div className="text-center">
            <p className="text-fluid-xs text-ns-muted mb-1">Moneyline</p>
            <Button variant="outline" size="sm" className="w-full text-fluid-sm">
              {game.odds.moneyline.home > 0 ? '+' : ''}{game.odds.moneyline.home}
            </Button>
          </div>
          {/* Total */}
          <div className="text-center">
            <p className="text-fluid-xs text-ns-muted mb-1">Total</p>
            <Button variant="outline" size="sm" className="w-full text-fluid-sm">
              O {game.odds.total.line}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}