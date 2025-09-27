'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Home, TrendingUp, User, Menu } from 'lucide-react'
import { useMobileStore } from '@/store/mobile-state'
import { cn } from '@/lib/utils'

const navLinks = [
	{ name: 'Home', href: '/', icon: Home },
	{ name: 'My Bets', href: '/my-bets', icon: TrendingUp },
	{ name: 'Account', href: '/account', icon: User },
]

export default function MobileBottomNav() {
	const pathname = usePathname()
	const { toggleMenu } = useMobileStore()

	function toggleSportsSheet(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
		event.preventDefault()
		toggleMenu()
	}
	return (
		<nav className="fixed bottom-0 left-0 right-0 bg-ns-card border-t border-ns-border z-50 md:hidden">
			<div className="grid grid-cols-4 h-16">
				{navLinks.map((link) => {
					const Icon = link.icon
					const isActive = pathname === link.href
					return (
						<Link
							key={link.name}
							href={link.href}
							className={cn(
								'flex flex-col items-center justify-center space-y-1 transition-colors',
								isActive ? 'text-ns-blue' : 'text-ns-muted'
							)}
						>
							<Icon className="h-5 w-5" />
							<span className="text-xs font-medium">{link.name}</span>
						</Link>
					)
				})}
				<button
					onClick={toggleSportsSheet}
					className="flex flex-col items-center justify-center space-y-1 text-ns-muted"
				>
					<Menu className="h-5 w-5" />
					<span className="text-xs font-medium">Sports</span>
				</button>
			</div>
		</nav>
	)
}