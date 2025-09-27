'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Bell, Plus } from 'lucide-react'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-white border-b border-ns-dark-200 z-30">
      <div className="flex items-center justify-between h-full px-4 sm:px-6">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ns-dark-400" />
            <Input
              type="text"
              placeholder="Search games, teams..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button size="sm" className="bg-ns-blue-500 hover:bg-ns-blue-600">
            <Plus className="h-4 w-4 mr-2" />
            Quick Bet
          </Button>

          <Button variant="ghost" size="icon" className="text-ns-dark-600 hover:text-ns-dark-900">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}