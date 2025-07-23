import React, { useState } from 'react'
import { useCrypto } from '../context/CryptoContext'
import { useAuth } from '../context/AuthContext'
import { Plus, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react'
import AddTokenModal from '../components/AddTokenModal'
import PriceChart from '../components/PriceChart'

const Dashboard = () => {
  const { trackedTokens, alerts } = useCrypto()
  const { user } = useAuth()
  const [showAddToken, setShowAddToken] = useState(false)

  const totalPortfolioValue = trackedTokens.reduce(
    (total, token) => total + (token.currentPrice * token.holdings), 
    0
  )

  const activeAlerts = alerts.filter(alert => alert.isActive).length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Welcome to CryptoSentinel</h1>
        <p className="text-gray-400">Effortless crypto tracking and alerts - without exposing your wallet credentials</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-medium mb-2">Portfolio Value</h3>
          <p className="text-2xl font-bold text-green-400">
            ${totalPortfolioValue.toLocaleString()}
          </p>
        </div>
        <div className="card">
          <h3 className="text-lg font-medium mb-2">Tracked Tokens</h3>
          <p className="text-2xl font-bold text-blue-400">{trackedTokens.length}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-medium mb-2">Active Alerts</h3>
          <p className="text-2xl font-bold text-yellow-400">{activeAlerts}</p>
        </div>
      </div>

      {/* Portfolio Overview */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Your Portfolio</h2>
          <button 
            onClick={() => setShowAddToken(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Token</span>
          </button>
        </div>

        <div className="space-y-4">
          {trackedTokens.map(token => (
            <div key={token.id} className="flex items-center justify-between p-4 bg-crypto-accent rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">{token.symbol.slice(0, 2)}</span>
                </div>
                <div>
                  <h3 className="font-medium">{token.name}</h3>
                  <p className="text-sm text-gray-400">{token.symbol}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-medium">${token.currentPrice.toLocaleString()}</p>
                <div className="flex items-center space-x-1">
                  {token.change24h > 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-400" />
                  )}
                  <span className={`text-sm ${token.change24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {token.change24h.toFixed(2)}%
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-medium">{token.holdings} {token.symbol}</p>
                <p className="text-sm text-gray-400">
                  ${(token.currentPrice * token.holdings).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {trackedTokens.length === 0 && (
          <div className="text-center py-8">
            <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400">No tokens tracked yet. Add your first token to get started!</p>
          </div>
        )}
      </div>

      {/* Price Chart */}
      {trackedTokens.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-bold mb-6">Price Overview</h2>
          <PriceChart tokens={trackedTokens} />
        </div>
      )}

      {/* Add Token Modal */}
      {showAddToken && (
        <AddTokenModal onClose={() => setShowAddToken(false)} />
      )}
    </div>
  )
}

export default Dashboard