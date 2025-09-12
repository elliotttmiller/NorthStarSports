'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BetSelection {
  id: string;
  gameTeams: string;
  gameTime: string;
  betType: string;
  selection: string;
  odds: string;
  decimalOdds: number;
}

interface BetSlipProps {
  isOpen: boolean;
  onClose: () => void;
  selections: BetSelection[];
  onRemoveSelection: (id: string) => void;
  className?: string;
}

export function BetSlip({ 
  isOpen, 
  onClose, 
  selections, 
  onRemoveSelection, 
  className 
}: BetSlipProps) {
  const [wagerAmount, setWagerAmount] = useState<number>(0);
  const [betType, setBetType] = useState<'straight' | 'parlay'>('straight');

  const quickAmounts = [25, 50, 100, 250];

  const calculatePayout = () => {
    if (!wagerAmount || selections.length === 0) return 0;
    
    if (betType === 'parlay' && selections.length > 1) {
      // Calculate parlay payout
      const combinedOdds = selections.reduce((acc, sel) => acc * sel.decimalOdds, 1);
      return wagerAmount * combinedOdds;
    } else {
      // Calculate straight bet payout (using first selection)
      return wagerAmount * selections[0]?.decimalOdds || 0;
    }
  };

  const potentialPayout = calculatePayout();
  const profit = potentialPayout - wagerAmount;

  if (!isOpen) return null;

  return (
    <div className={cn(
      'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end',
      className
    )}>
      <div className="bg-white w-full max-h-[85vh] rounded-t-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-primary text-white px-5 py-4 flex justify-between items-center">
          <button onClick={onClose} className="text-white text-xl">
            ←
          </button>
          <h2 className="text-lg font-semibold">Bet Slip</h2>
          <button onClick={onClose} className="text-white text-xl">
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-white border-b border-neutral-200">
          <button
            onClick={() => setBetType('straight')}
            className={cn(
              'flex-1 py-4 px-3 text-sm font-medium transition-colors',
              betType === 'straight'
                ? 'text-primary border-b-2 border-primary'
                : 'text-neutral-600'
            )}
          >
            Straight ({selections.length})
          </button>
          <button
            onClick={() => setBetType('parlay')}
            className={cn(
              'flex-1 py-4 px-3 text-sm font-medium transition-colors',
              betType === 'parlay'
                ? 'text-primary border-b-2 border-primary'
                : 'text-neutral-600'
            )}
            disabled={selections.length < 2}
          >
            Parlay ({selections.length > 1 ? '1' : '0'})
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto max-h-[60vh]">
          {selections.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                No selections yet
              </h3>
              <p className="text-neutral-600">
                Add bets to your slip to get started
              </p>
            </div>
          ) : (
            <>
              {/* Selections */}
              <div className="mb-6">
                <h3 className="text-base font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                  Selections
                  <span className="bg-primary text-white text-xs px-2 py-1 rounded-full font-semibold">
                    {selections.length}
                  </span>
                </h3>
                
                <div className="space-y-3">
                  {selections.map((selection) => (
                    <div key={selection.id} className="bg-white border border-neutral-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="font-medium text-neutral-900 text-sm mb-1">
                            {selection.gameTeams}
                          </div>
                          <div className="text-xs text-neutral-600">
                            {selection.gameTime}
                          </div>
                        </div>
                        <button
                          onClick={() => onRemoveSelection(selection.id)}
                          className="w-7 h-7 bg-neutral-100 border border-neutral-200 rounded-full flex items-center justify-center text-neutral-600 hover:bg-red-50 hover:border-error hover:text-error transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                      
                      <div className="bg-neutral-50 rounded-lg p-3 border-l-4 border-primary">
                        <div className="font-medium text-neutral-900 text-sm mb-1">
                          {selection.selection}
                        </div>
                        <div className="text-xs text-neutral-600">
                          {selection.odds}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Wager Section */}
              <div className="bg-white border border-neutral-200 rounded-lg p-4 mb-4">
                <h3 className="text-base font-semibold text-neutral-900 mb-4">Wager</h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Risk Amount
                  </label>
                  <input
                    type="number"
                    value={wagerAmount || ''}
                    onChange={(e) => setWagerAmount(Number(e.target.value))}
                    placeholder="Enter amount"
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg text-lg font-medium focus:border-primary focus:outline-none transition-colors"
                  />
                  
                  {/* Quick Amount Buttons */}
                  <div className="flex gap-2 mt-3">
                    {quickAmounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setWagerAmount(amount)}
                        className="bg-neutral-100 border border-neutral-200 px-3 py-2 rounded-md text-sm font-medium hover:bg-primary/5 hover:border-primary hover:text-primary transition-all"
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Calculations */}
              {wagerAmount > 0 && (
                <div className="bg-white border border-neutral-200 rounded-lg p-4 mb-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-neutral-600">Risk</span>
                      <span className="text-sm font-medium">${wagerAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-neutral-600">Potential Profit</span>
                      <span className="text-sm font-medium text-success">${profit.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-neutral-200 pt-3">
                      <div className="flex justify-between">
                        <span className="text-base font-semibold text-neutral-900">Total Payout</span>
                        <span className="text-base font-semibold text-primary">${potentialPayout.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Place Bet Button */}
              <Button 
                className="w-full py-4 text-lg font-semibold"
                disabled={!wagerAmount || wagerAmount <= 0}
              >
                Place Bet - ${potentialPayout.toFixed(2)}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}