import React from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header className={cn(
      'bg-white border-b border-neutral-200 sticky top-0 z-50',
      'shadow-sm',
      className
    )}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl lg:text-2xl font-bold text-primary">
            NorthStar Sports
          </h1>
        </div>
        
        <div className="flex items-center gap-3 lg:gap-4">
          {/* Desktop Navigation - Only visible on large screens */}
          <nav className="hidden lg:flex items-center gap-6 mr-6">
            <a href="/" className="text-neutral-700 hover:text-primary transition-colors font-medium">
              Home
            </a>
            <a href="/sports" className="text-neutral-700 hover:text-primary transition-colors font-medium">
              A-Z Sports
            </a>
            <a href="/my-bets" className="text-neutral-700 hover:text-primary transition-colors font-medium">
              My Bets
            </a>
          </nav>
          
          {/* User balance */}
          <div className="text-sm lg:text-base">
            <span className="text-neutral-600">Balance:</span>
            <span className="ml-1 font-semibold text-neutral-900">$1,250.00</span>
          </div>
          
          {/* Profile icon */}
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-neutral-200 rounded-full flex items-center justify-center">
            <span className="text-sm lg:text-base font-semibold text-neutral-600">U</span>
          </div>
        </div>
      </div>
    </header>
  );
}