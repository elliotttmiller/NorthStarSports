'use client';

import React, { useState } from 'react';
import { BetCard, BetCardData } from '@/components/ui/bet-card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Sample data for bets
const activeBets: BetCardData[] = [
  {
    id: '1',
    gameMatchup: 'Lakers vs Warriors',
    betSelection: 'Lakers +5.5',
    odds: '+110',
    riskAmount: 100,
    potentialWin: 210,
    betType: 'Spread',
    status: 'active',
    gameTime: 'Live - 2nd Quarter',
    league: 'NBA'
  },
  {
    id: '2',
    gameMatchup: 'Cowboys vs Giants',
    betSelection: 'Over 47.5',
    odds: '-115',
    riskAmount: 50,
    potentialWin: 93.48,
    betType: 'Total',
    status: 'active',
    gameTime: 'Live - 3rd Quarter',
    league: 'NFL'
  },
  {
    id: '3',
    gameMatchup: 'Ravens vs Steelers',
    betSelection: 'Ravens -2.5',
    odds: '-108',
    riskAmount: 150,
    potentialWin: 288.89,
    betType: 'Spread',
    status: 'active',
    gameTime: 'Sunday 1:00 PM ET',
    league: 'NFL'
  }
];

const settledBets: BetCardData[] = [
  {
    id: '4',
    gameMatchup: 'Celtics vs Heat',
    betSelection: 'Celtics ML',
    odds: '-140',
    riskAmount: 75,
    potentialWin: 128.57,
    betType: 'Moneyline',
    status: 'won',
    gameTime: 'Yesterday',
    league: 'NBA'
  },
  {
    id: '5',
    gameMatchup: 'Chiefs vs Bills',
    betSelection: 'Under 54.5',
    odds: '+105',
    riskAmount: 125,
    potentialWin: 256.25,
    betType: 'Total',
    status: 'lost',
    gameTime: 'Monday',
    league: 'NFL'
  },
  {
    id: '6',
    gameMatchup: 'Nuggets vs Suns',
    betSelection: 'Nuggets -3.5',
    odds: '-110',
    riskAmount: 80,
    potentialWin: 152.73,
    betType: 'Spread',
    status: 'won',
    gameTime: 'Tuesday',
    league: 'NBA'
  },
  {
    id: '7',
    gameMatchup: 'Packers vs Bears',
    betSelection: 'Packers ML',
    odds: '-165',
    riskAmount: 90,
    potentialWin: 144.55,
    betType: 'Moneyline',
    status: 'lost',
    gameTime: 'Last Sunday',
    league: 'NFL'
  }
];

type TabType = 'active' | 'settled';

export default function MyBetsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('active');
  
  const currentBets = activeTab === 'active' ? activeBets : settledBets;
  const totalRisk = currentBets.reduce((sum, bet) => sum + bet.riskAmount, 0);
  const totalPotentialWin = currentBets.reduce((sum, bet) => sum + bet.potentialWin, 0);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Page Header */}
      <div className="bg-white border-b border-neutral-200 px-5 py-6">
        <h1 className="text-2xl font-bold text-neutral-900">My Bets</h1>
        <p className="text-neutral-600 mt-1">Track your active and settled wagers</p>
      </div>

      {/* Summary Cards */}
      <div className="px-5 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg border border-neutral-200 p-4">
            <div className="text-sm text-neutral-600">Total Risk</div>
            <div className="text-xl font-bold text-neutral-900">${totalRisk}</div>
          </div>
          <div className="bg-white rounded-lg border border-neutral-200 p-4">
            <div className="text-sm text-neutral-600">
              {activeTab === 'active' ? 'Potential Win' : 'Total Return'}
            </div>
            <div className="text-xl font-bold text-success">${totalPotentialWin.toFixed(2)}</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-5 py-2">
        <div className="flex bg-neutral-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('active')}
            className={cn(
              'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200',
              activeTab === 'active'
                ? 'bg-white text-primary shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            )}
          >
            Active ({activeBets.length})
          </button>
          <button
            onClick={() => setActiveTab('settled')}
            className={cn(
              'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200',
              activeTab === 'settled'
                ? 'bg-white text-primary shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            )}
          >
            Settled ({settledBets.length})
          </button>
        </div>
      </div>

      {/* Bet Cards */}
      <div className="px-5 py-4">
        {currentBets.length > 0 ? (
          <div className="space-y-4">
            {currentBets.map((bet) => (
              <BetCard key={bet.id} bet={bet} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">
              {activeTab === 'active' ? '🎯' : '📋'}
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              {activeTab === 'active' ? 'No Active Bets' : 'No Settled Bets'}
            </h3>
            <p className="text-neutral-600 mb-6">
              {activeTab === 'active' 
                ? "You don't have any active bets. Start placing bets to see them here!"
                : "No settled bets to display yet. Your completed bets will appear here."
              }
            </p>
            {activeTab === 'active' && (
              <Button className="mx-auto">
                Explore Games
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {currentBets.length > 0 && activeTab === 'active' && (
        <div className="px-5 py-4">
          <div className="bg-white rounded-lg border border-neutral-200 p-4">
            <h3 className="font-semibold text-neutral-900 mb-3">Quick Actions</h3>
            <div className="flex gap-3">
              <Button variant="secondary" size="sm" className="flex-1">
                Cash Out All
              </Button>
              <Button variant="primary" size="sm" className="flex-1">
                Place New Bet
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}