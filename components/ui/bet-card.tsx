import React from 'react';
import { cn } from '@/lib/utils';

export interface BetCardData {
  id: string;
  gameMatchup: string;
  betSelection: string;
  odds: string;
  riskAmount: number;
  potentialWin: number;
  betType: string;
  status: 'active' | 'won' | 'lost';
  gameTime?: string;
  league?: string;
}

interface BetCardProps {
  bet: BetCardData;
  className?: string;
}

const statusStyles = {
  active: {
    card: 'border-warning shadow-[0_2px_8px_rgba(255,193,7,0.2)]',
    header: 'bg-yellow-50',
    icon: '⏱️',
    iconColor: 'text-warning',
  },
  won: {
    card: 'border-success shadow-[0_2px_8px_rgba(40,167,69,0.2)]',
    header: 'bg-green-50',
    icon: '✅',
    iconColor: 'text-success',
  },
  lost: {
    card: 'border-error shadow-[0_2px_8px_rgba(220,53,69,0.2)]',
    header: 'bg-red-50',
    icon: '❌',
    iconColor: 'text-error',
  },
};

export function BetCard({ bet, className }: BetCardProps) {
  const statusStyle = statusStyles[bet.status];
  
  return (
    <div 
      className={cn(
        'bet-card border border-neutral-200 rounded-card bg-white shadow-card overflow-hidden transition-all duration-200',
        'hover:shadow-card-hover hover:-translate-y-1',
        statusStyle.card,
        className
      )}
    >
      {/* Header */}
      <div className={cn(
        'px-5 py-4 border-b border-neutral-200 flex justify-between items-center',
        statusStyle.header
      )}>
        <span className="text-xs font-bold text-neutral-600 uppercase tracking-wide">
          {bet.betType}
        </span>
        <span className="text-base font-bold text-neutral-900">
          ${bet.riskAmount}
        </span>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="text-lg font-semibold text-neutral-900 mb-2">
          {bet.gameMatchup}
        </div>
        <div className="text-neutral-600 mb-4 flex items-center gap-2">
          <span>{bet.betSelection}</span>
          <span className="font-mono text-neutral-900 font-semibold">
            {bet.odds}
          </span>
        </div>
        {bet.gameTime && (
          <div className="text-sm text-neutral-600 mb-2">
            {bet.gameTime}
          </div>
        )}
        {bet.league && (
          <div className="text-xs text-neutral-400 uppercase tracking-wide">
            {bet.league}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className={cn(
        'px-5 py-4 border-t border-neutral-200 flex justify-between items-center text-sm',
        statusStyle.header
      )}>
        <span className="text-neutral-600">
          Risk: ${bet.riskAmount}
        </span>
        <div className="flex items-center gap-2">
          <span className={cn(
            'font-semibold',
            bet.status === 'won' ? 'text-success' : 
            bet.status === 'lost' ? 'text-error' : 
            'text-neutral-900'
          )}>
            Win: ${bet.potentialWin}
          </span>
          <span className={cn('text-lg', statusStyle.iconColor)}>
            {statusStyle.icon}
          </span>
        </div>
      </div>
    </div>
  );
}