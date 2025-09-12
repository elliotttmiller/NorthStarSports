'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  {
    href: '/',
    label: 'Home',
    icon: '🏠',
  },
  {
    href: '/sports',
    label: 'A-Z Sports',
    icon: '⚽',
  },
  {
    href: '/my-bets',
    label: 'My Bets',
    icon: '🎯',
  },
];

interface BottomNavProps {
  className?: string;
}

export function BottomNav({ className }: BottomNavProps) {
  const pathname = usePathname();

  return (
    <nav className={cn(
      'fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 z-40',
      'flex justify-around items-center py-2 px-4 safe-area-pb',
      'lg:hidden', // Hide on large screens (desktop)
      className
    )}>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-all duration-200',
              'min-w-[60px] text-xs font-medium',
              isActive
                ? 'text-primary bg-primary/5'
                : 'text-neutral-600 hover:text-primary hover:bg-neutral-50'
            )}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}