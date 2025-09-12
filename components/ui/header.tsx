import React from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header className={cn(
      'bg-white border-b border-neutral-200 px-5 py-4 sticky top-0 z-50',
      'flex justify-between items-center shadow-sm',
      className
    )}>
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-primary">
          NorthStar Sports
        </h1>
      </div>
      
      <div className="flex items-center gap-3">
        {/* User balance */}
        <div className="text-sm">
          <span className="text-neutral-600">Balance:</span>
          <span className="ml-1 font-semibold text-neutral-900">$1,250.00</span>
        </div>
        
        {/* Profile icon */}
        <div className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center">
          <span className="text-sm font-semibold text-neutral-600">U</span>
        </div>
      </div>
    </header>
  );
}