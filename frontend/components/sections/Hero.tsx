import { Button } from '@/components/ui/button'
import { TrendingUp, Zap, Shield } from 'lucide-react'

export default function Hero() {
  return (
    <div className="max-w-7xl mx-auto text-center">
      {/* Fluid typography for hero heading */}
      <h1 className="text-fluid-6xl font-bold mb-fluid-lg bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
        NorthStar Sports
      </h1>
      
      <p className="text-fluid-xl text-ns-muted mb-fluid-xl max-w-3xl mx-auto leading-relaxed">
        Experience the future of sports betting with live odds, instant payouts, and 
        professional-grade analytics. Your winning starts here.
      </p>
      
      {/* CTA Buttons with fluid spacing */}
      <div className="flex flex-col sm:flex-row gap-fluid-base justify-center items-center mb-fluid-2xl">
        <Button size="lg" className="text-fluid-lg px-fluid-lg py-fluid-base">
          Start Betting Now
        </Button>
        <Button variant="outline" size="lg" className="text-fluid-lg px-fluid-lg py-fluid-base">
          View Live Odds
        </Button>
      </div>
      
      {/* Feature highlights with container queries */}
      <div className="@container">
        <div className="grid grid-cols-1 @md:grid-cols-3 gap-fluid-lg max-w-4xl mx-auto">
          <div className="flex flex-col @lg:flex-row items-center gap-fluid-sm text-center @lg:text-left">
            <div className="bg-ns-blue/20 p-fluid-sm rounded-lg">
              <TrendingUp className="w-6 h-6 text-ns-blue" />
            </div>
            <div>
              <h3 className="text-fluid-lg font-semibold mb-1">Live Odds</h3>
              <p className="text-fluid-sm text-ns-muted line-clamp-2">
                Real-time updates across all major sports and leagues with instant line movements.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col @lg:flex-row items-center gap-fluid-sm text-center @lg:text-left">
            <div className="bg-ns-green/20 p-fluid-sm rounded-lg">
              <Zap className="w-6 h-6 text-ns-green" />
            </div>
            <div>
              <h3 className="text-fluid-lg font-semibold mb-1">Instant Payouts</h3>
              <p className="text-fluid-sm text-ns-muted line-clamp-2">
                Lightning-fast withdrawals and deposits with industry-leading processing times.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col @lg:flex-row items-center gap-fluid-sm text-center @lg:text-left">
            <div className="bg-ns-yellow/20 p-fluid-sm rounded-lg">
              <Shield className="w-6 h-6 text-ns-yellow" />
            </div>
            <div>
              <h3 className="text-fluid-lg font-semibold mb-1">Secure Platform</h3>
              <p className="text-fluid-sm text-ns-muted line-clamp-2">
                Bank-grade encryption and licensed operations ensuring your funds are protected.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}