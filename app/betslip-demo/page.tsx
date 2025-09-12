'use client';

import React, { useState } from 'react';
import { BetSlip } from '@/components/ui/bet-slip';
import { Button } from '@/components/ui/button';

// Sample data for demo
const sampleSelections = [
  {
    id: '1',
    gameTeams: 'Lakers vs Warriors',
    gameTime: 'Tonight 7:30 PM ET',
    betType: 'Spread',
    selection: 'Lakers +5.5',
    odds: '+110',
    decimalOdds: 2.1,
  },
  {
    id: '2',
    gameTeams: 'Cowboys vs Giants',
    gameTime: 'Sunday 1:00 PM ET',
    betType: 'Total',
    selection: 'Over 47.5',
    odds: '-115',
    decimalOdds: 1.87,
  }
];

export default function BetSlipDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [selections, setSelections] = useState(sampleSelections);

  const handleRemoveSelection = (id: string) => {
    setSelections(prev => prev.filter(sel => sel.id !== id));
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-5">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">
          BetSlip Component Demo
        </h1>
        <p className="text-lg text-neutral-600 mb-8">
          Click to view the styled BetSlip component
        </p>
        
        <Button onClick={() => setIsOpen(true)}>
          Open BetSlip ({selections.length} selections)
        </Button>

        <BetSlip
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          selections={selections}
          onRemoveSelection={handleRemoveSelection}
        />
      </div>
    </div>
  );
}