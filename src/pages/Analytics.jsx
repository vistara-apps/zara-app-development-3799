import React from 'react'
import { useCrypto } from '../context/CryptoContext'
import { useAuth } from '../context/AuthContext'
import { TrendingUp, TrendingDown, PieChart, BarChart3, Lock } from 'lucide-react'
import { Link } from 'react-router-dom'

const Analytics = () => {
  const { trackedTokens } = useCrypto()
  const { user } = useAuth()

  const totalValue = trackedTokens.reduce((sum, token) => sum + (token.currentPrice * token.holdings), 0)
  const winners = trackedTokens.filter(token => token.change24h > 0).length
  const losers = trackedTokens.filter(token => token.change24h < 0).length

  // Premium feature check
  const isPremium = user.isPremium

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Portfolio Analytics</h1>
        <p className="text-gray-400">Gain insights into your trading patterns and portfolio performance</p>
      </div>

      {/* Basic Analytics - Free Tier */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <h3 className="text-lg font-medium mb-2">Total Value</h3>
          <p className="text-2xl font-bold text-green-400">${totalValue.toLocaleString()}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-medium mb-2">Winners Today</h3>
          <p className="text-2xl font-bold text-green-400">{winners}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-medium mb-2">Losers Today</h3>
          <p className="text-2xl font-bold text-red-400">{losers}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-medium mb-2">Best Performer</h3>
          {trackedTokens.length > 0 ? (
            <div>
              <p className="text-lg font-bold text-blue-400">
                {trackedTokens.reduce((best, token) => 
                  token.change24h > best.change24h ? token : best
                ).symbol}
              </p>
              <p className="text-sm text-green-400">
                +{trackedTokens.reduce((best, token) => 
                  token.change24h > best.change24h ? token : best
                ).change24h.toFixed(2)}%
              </p>
            </div>
          ) : (
            <p className="text-gray-400">No data</p>
          )}
        </div>
      </div>

      {/* Portfolio Distribution */}
      <div className="card">
        <h2 className="text-xl font-bold mb-6">Portfolio Distribution</h2>
        <div className="space-y-4">
          {trackedTokens.map(token => {
            const tokenValue = token.currentPrice * token.holdings
            const percentage = totalValue > 0 ? (tokenValue / totalValue) * 100 : 0
            
            return (
              <div key={token.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold">{token.symbol.slice(0, 2)}</span>
                  </div>
                  <span className="font-medium">{token.name}</span>
                </div>
                <div className="text-right">
                  <p className="font-medium">{percentage.toFixed(1)}%</p>
                  <p className="text-sm text-gray-400">${tokenValue.toLocaleString()}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Premium Analytics */}
      {!isPremium && (
        <div className="card relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="text-center">
              <Lock className="h-12 w-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Premium Analytics</h3>
              <p className="text-gray-300 mb-4">Unlock advanced trading insights and performance metrics</p>
              <Link to="/premium" className="btn-primary">
                Upgrade to Premium
              </Link>
            </div>
          </div>
          
          <h2 className="text-xl font-bold mb-6">Advanced Trading Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-50">
            <div>
              <h3 className="font-medium mb-4">Trading Pattern Analysis</h3>
              <div className="h-32 bg-crypto-accent rounded flex items-center justify-center">
                <BarChart3 className="h-8 w-8 text-gray-400" />
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-4">Risk Assessment</h3>
              <div className="h-32 bg-crypto-accent rounded flex items-center justify-center">
                <PieChart className="h-8 w-8 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      )}

      {isPremium && (
        <div className="card">
          <h2 className="text-xl font-bold mb-6">Advanced Trading Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-4">Trading Pattern Analysis</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Buy Frequency</span>
                  <span className="font-medium">3.2x/week</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Avg Hold Time</span>
                  <span className="font-medium">14 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Win Rate</span>
                  <span className="font-medium text-green-400">67%</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-4">Risk Assessment</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Portfolio Beta</span>
                  <span className="font-medium">1.24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Volatility</span>
                  <span className="font-medium text-yellow-400">Medium</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Diversification</span>
                  <span className="font-medium text-green-400">Good</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Analytics