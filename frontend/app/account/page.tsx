'use client'

import { useUIStore } from '@/store/ui-state'
import { cn } from '@/lib/utils'

export default function AccountPage() {
  const { isSportsOpen, isBetSlipOpen } = useUIStore()

  const getContentMargins = () => {
    let leftMargin = 'ml-0'
    let rightMargin = 'mr-0'
    
    if (isSportsOpen) leftMargin = 'ml-[280px]'
    if (isBetSlipOpen) rightMargin = 'mr-[320px]'
    
    return `${leftMargin} ${rightMargin}`
  }

  return (
    <div className={cn('transition-all duration-300 ease-in-out', getContentMargins())}>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-ns-light mb-2">Account</h1>
        <p className="text-ns-muted">Manage your account settings and preferences.</p>
      </div>
    </div>
  )
}