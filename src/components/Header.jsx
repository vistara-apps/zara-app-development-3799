import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Shield, BarChart, Bell, Crown } from 'lucide-react'

const Header = () => {
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: BarChart },
    { path: '/alerts', label: 'Alerts', icon: Bell },
    { path: '/analytics', label: 'Analytics', icon: BarChart },
    { path: '/premium', label: 'Premium', icon: Crown },
  ]

  return (
    <header className="bg-crypto-secondary border-b border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold">CryptoSentinel</span>
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                  location.pathname === path
                    ? 'bg-crypto-accent text-blue-400'
                    : 'text-gray-300 hover:text-white hover:bg-crypto-accent'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
          
          <ConnectButton />
        </div>
      </div>
    </header>
  )
}

export default Header