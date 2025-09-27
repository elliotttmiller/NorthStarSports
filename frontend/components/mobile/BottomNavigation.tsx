'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Trophy, FileText, User } from 'lucide-react'
import { useMobileStore } from '@/store/mobile-state'
import { cn } from '@/lib/utils'

const navItems = [
	{ name: 'Home', href: '/', icon: Home },
	{ name: 'Sports', href: '#', icon: Trophy, isMenu: true },
	{ name: 'My Bets', href: '/my-bets', icon: FileText },
	{ name: 'Account', href: '/account', icon: User },
]

export default function BottomNavigation() {
	const pathname = usePathname()
	const { toggleMenu } = useMobileStore()

	const handleNavClick = (item: any) => {
		if (item.isMenu) {
			toggleMenu()
		}
	}

	return (
		<div className='fixed bottom-0 left-0 right-0 z-40 bg-ns-card border-t border-ns-border md:hidden'>
			<div className='grid grid-cols-4 h-16'>
				{navItems.map((item) => {
					const Icon = item.icon
					const isActive =
						item.href !== '#' &&
						(pathname === item.href ||
							(item.href.includes('/sports') &&
								pathname.includes('/sports')))

					if (item.isMenu) {
						return (
							<button
								key={item.name}
								onClick={() => handleNavClick(item)}
								className='flex flex-col items-center justify-center space-y-1 text-ns-muted hover:text-ns-light transition-colors'
							>
								<Icon className='h-5 w-5' />
								<span className='text-xs font-medium'>{item.name}</span>
							</button>
						)
					}

					return (
						<Link
							key={item.name}
							href={item.href}
							className={cn(
								'flex flex-col items-center justify-center space-y-1 transition-colors',
								isActive
									? 'text-ns-blue'
									: 'text-ns-muted hover:text-ns-light'
							)}
						>
							<Icon className='h-5 w-5' />
							<span className='text-xs font-medium'>{item.name}</span>
						</Link>
					)
				})}
			</div>
		</div>
	)
}

// Replace 'any' with a more specific type if possible, otherwise use 'unknown' or a proper interface