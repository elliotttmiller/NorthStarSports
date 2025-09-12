import React from 'react';
import { BetCard, BetCardData } from '@/components/ui/bet-card';
import { Button } from '@/components/ui/button';

// Sample data for the featured games
const liveGames: BetCardData[] = [
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
    gameMatchup: 'Celtics vs Heat',
    betSelection: 'Celtics ML',
    odds: '-140',
    riskAmount: 75,
    potentialWin: 128.57,
    betType: 'Moneyline',
    status: 'active',
    gameTime: 'Live - 4th Quarter',
    league: 'NBA'
  },
  {
    id: '4',
    gameMatchup: 'Chiefs vs Bills',
    betSelection: 'Under 54.5',
    odds: '+105',
    riskAmount: 125,
    potentialWin: 256.25,
    betType: 'Total',
    status: 'active',
    gameTime: 'Live - 2nd Half',
    league: 'NFL'
  },
  {
    id: '5',
    gameMatchup: 'Nuggets vs Suns',
    betSelection: 'Nuggets -3.5',
    odds: '-110',
    riskAmount: 80,
    potentialWin: 152.73,
    betType: 'Spread',
    status: 'active',
    gameTime: 'Live - 1st Quarter',
    league: 'NBA'
  }
];

const upcomingGames: BetCardData[] = [
  {
    id: '6',
    gameMatchup: 'Ravens vs Steelers',
    betSelection: 'Ravens -2.5',
    odds: '-108',
    riskAmount: 150,
    potentialWin: 288.89,
    betType: 'Spread',
    status: 'active',
    gameTime: 'Sunday 1:00 PM ET',
    league: 'NFL'
  },
  {
    id: '7',
    gameMatchup: 'Knicks vs Nets',
    betSelection: 'Over 215.5',
    odds: '+100',
    riskAmount: 200,
    potentialWin: 400,
    betType: 'Total',
    status: 'active',
    gameTime: 'Tonight 7:30 PM ET',
    league: 'NBA'
  },
  {
    id: '8',
    gameMatchup: 'Packers vs Bears',
    betSelection: 'Packers ML',
    odds: '-165',
    riskAmount: 90,
    potentialWin: 144.55,
    betType: 'Moneyline',
    status: 'active',
    gameTime: 'Sunday 4:25 PM ET',
    league: 'NFL'
  },
  {
    id: '9',
    gameMatchup: 'Bucks vs 76ers',
    betSelection: 'Bucks -4.5',
    odds: '-112',
    riskAmount: 60,
    potentialWin: 113.57,
    betType: 'Spread',
    status: 'active',
    gameTime: 'Tomorrow 8:00 PM ET',
    league: 'NBA'
  },
  {
    id: '10',
    gameMatchup: 'Rams vs Cardinals',
    betSelection: 'Under 49.5',
    odds: '-105',
    riskAmount: 110,
    potentialWin: 214.76,
    betType: 'Total',
    status: 'active',
    gameTime: 'Monday 8:20 PM ET',
    league: 'NFL'
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Page Header */}
      <div className="bg-white border-b border-neutral-200 px-5 py-6">
        <h1 className="text-2xl font-bold text-neutral-900">Featured Games</h1>
        <p className="text-neutral-600 mt-1">Live betting and upcoming opportunities</p>
      </div>

      {/* Live Games Section */}
      <section className="px-5 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-neutral-900">🔴 Live Now</h2>
          <Button variant="secondary" size="sm">
            View All
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <div className="flex gap-4 pb-4" style={{ width: 'max-content' }}>
            {liveGames.map((game) => (
              <div key={game.id} className="w-80 flex-shrink-0">
                <BetCard bet={game} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Upcoming Games Section */}
      <section className="px-5 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-neutral-900">⭐ Popular Upcoming</h2>
          <Button variant="secondary" size="sm">
            View All
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <div className="flex gap-4 pb-4" style={{ width: 'max-content' }}>
            {upcomingGames.map((game) => (
              <div key={game.id} className="w-80 flex-shrink-0">
                <BetCard bet={game} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contests Section */}
      <section className="px-5 py-6">
        <div className="bg-gradient-to-r from-primary to-primary-light rounded-card p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2">🏆 Upcoming Contests</h2>
              <p className="text-blue-100 mb-4">
                Join our weekly contests for a chance to win big prizes!
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>NFL Week 15 Contest</span>
                  <span className="font-semibold">$10,000 Prize Pool</span>
                </div>
                <div className="flex justify-between">
                  <span>NBA Daily Contest</span>
                  <span className="font-semibold">$5,000 Prize Pool</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <Button variant="secondary" className="bg-white text-primary hover:bg-neutral-50">
                View Contests
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}