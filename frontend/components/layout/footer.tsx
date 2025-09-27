import Link from 'next/link'
import { Star, Shield, Award, Users, Facebook, Twitter, Instagram, Youtube, Mail, Phone } from 'lucide-react'

const footerLinks = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
    { name: 'Contact', href: '/contact' },
  ],
  support: [
    { name: 'Help Center', href: '/help' },
    { name: 'Responsible Gaming', href: '/responsible-gaming' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
  ],
  betting: [
    { name: 'How to Bet', href: '/how-to-bet' },
    { name: 'Betting Rules', href: '/betting-rules' },
    { name: 'Odds Explained', href: '/odds-explained' },
    { name: 'Sports Guide', href: '/sports-guide' },
  ],
}

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
]

const features = [
  { icon: Shield, title: 'Licensed & Secure', desc: 'Fully regulated platform' },
  { icon: Award, title: 'Best Odds', desc: 'Competitive odds guaranteed' },
  { icon: Users, title: '24/7 Support', desc: 'Always here to help' },
]

export default function Footer() {
  return (
    <footer className="bg-white border-t border-ns-dark-200 mt-16">
      <div className="container">
        {/* Features Bar */}
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="p-3 bg-ns-blue-600/10 rounded-xl">
                  <feature.icon className="h-6 w-6 text-ns-blue-600" />
                </div>
                <div>
                  <div className="font-semibold">{feature.title}</div>
                  <div className="text-sm text-ns-dark-600">{feature.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main footer content */}
        <div className="py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <div className="h-12 w-12 rounded-xl bg-hero-gradient flex items-center justify-center shadow-ns-glow">
                    <Star className="h-7 w-7 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 h-4 w-4 bg-ns-gold-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <div className="text-2xl font-display font-bold">NorthStar</div>
                  <div className="text-sm text-ns-dark-500 font-medium -mt-1">
                    SPORTS BETTING
                  </div>
                </div>
              </Link>
              <p className="text-ns-dark-600 text-sm leading-relaxed mb-6 max-w-md">
                Your premier destination for professional sports betting. Experience
                the thrill with industry-leading odds, instant payouts, and unmatched security.
              </p>

              {/* Contact Info */}
              <div className="space-y-2 text-sm text-ns-dark-600 mb-6">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>support@northstarsports.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>1-800-NORTHSTAR</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="p-2 bg-ns-dark-100 rounded-lg text-ns-dark-500 hover:text-ns-blue-600 hover:bg-ns-dark-200 transition-colors"
                  >
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-ns-dark-600 hover:text-ns-blue-600 text-sm transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                Support
              </h3>
              <ul className="space-y-3">
                {footerLinks.support.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-ns-dark-600 hover:text-ns-blue-600 text-sm transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Betting */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                Betting
              </h3>
              <ul className="space-y-3">
                {footerLinks.betting.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-ns-dark-600 hover:text-ns-blue-600 text-sm transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="border-t border-ns-dark-200 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <p className="text-ns-dark-600 text-sm">
                © 2024 NorthStar Sports. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-xs text-ns-dark-500">
                <span className="flex items-center space-x-1">
                  <Shield className="h-3 w-3" />
                  <span>Licensed & Regulated</span>
                </span>
                <span>•</span>
                <span>21+ Only</span>
                <span>•</span>
                <span>Gamble Responsibly</span>
              </div>
            </div>

            {/* Security Badges */}
            <div className="flex items-center space-x-4 opacity-80">
              <div className="text-xs text-ns-dark-600 bg-ns-dark-100 px-2 py-1 rounded">
                SSL SECURED
              </div>
              <div className="text-xs text-ns-dark-600 bg-ns-dark-100 px-2 py-1 rounded">
                RESPONSIBLE GAMING
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}