'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Trophy,
  TrendingUp,
  User,
  Settings,
  HelpCircle,
  Star,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Sports', href: '/sports', icon: Trophy },
  { name: 'Live Betting', href: '/live', icon: TrendingUp },
  { name: 'My Account', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Help', href: '/help', icon: HelpCircle },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-ns-sidebar border-r border-ns-border z-40">
      {/* Logo */}
      <div className="p-6 border-b border-ns-border">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 bg-ns-blue-500 rounded-lg flex items-center justify-center">
            <Star className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="text-white font-bold text-lg">NorthStar</div>
            <div className="text-ns-dark-200 text-xs">SPORTS</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <div className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-ns-blue-500 text-white'
                    : 'text-ns-dark-300 hover:text-white hover:bg-ns-dark-700/40'
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* User Info at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-ns-border">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 bg-ns-blue-500 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>
    </div>
  )
}