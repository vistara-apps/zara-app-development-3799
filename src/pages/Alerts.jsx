import React, { useState } from 'react'
import { useCrypto } from '../context/CryptoContext'
import { useAuth } from '../context/AuthContext'
import { Plus, Bell, Mail, MessageSquare, Trash2, Edit, ArrowUp, ArrowDown } from 'lucide-react'
import CreateAlertModal from '../components/CreateAlertModal'

const Alerts = () => {
  const { alerts, deleteAlert, updateAlert, trackedTokens } = useCrypto()
  const { user } = useAuth()
  const [showCreateAlert, setShowCreateAlert] = useState(false)

  const getTokenBySymbol = (symbol) => {
    return trackedTokens.find(token => token.symbol === symbol)
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'email':
        return <Mail className="h-4 w-4" />
      case 'telegram':
        return <MessageSquare className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const toggleAlert = (alertId, isActive) => {
    updateAlert(alertId, { isActive: !isActive })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Price Alerts</h1>
          <p className="text-gray-400">Get notified when your tokens hit target prices</p>
        </div>
        <button 
          onClick={() => setShowCreateAlert(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Create Alert</span>
        </button>
      </div>

      {/* Alert Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-medium mb-2">Total Alerts</h3>
          <p className="text-2xl font-bold text-blue-400">{alerts.length}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-medium mb-2">Active Alerts</h3>
          <p className="text-2xl font-bold text-green-400">
            {alerts.filter(alert => alert.isActive).length}
          </p>
        </div>
        <div className="card">
          <h3 className="text-lg font-medium mb-2">Triggered Today</h3>
          <p className="text-2xl font-bold text-yellow-400">0</p>
        </div>
      </div>

      {/* Alerts List */}
      <div className="card">
        <h2 className="text-xl font-bold mb-6">Your Alerts</h2>
        
        {alerts.length === 0 ? (
          <div className="text-center py-8">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">No alerts set up yet</p>
            <button 
              onClick={() => setShowCreateAlert(true)}
              className="btn-primary"
            >
              Create Your First Alert
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {alerts.map(alert => {
              const token = getTokenBySymbol(alert.tokenSymbol)
              const isTriggered = token && (
                (alert.type === 'above' && token.currentPrice >= alert.threshold) ||
                (alert.type === 'below' && token.currentPrice <= alert.threshold)
              )

              return (
                <div 
                  key={alert.id} 
                  className={`p-4 rounded-lg border-l-4 ${
                    isTriggered 
                      ? 'bg-green-900/20 border-green-400' 
                      : alert.isActive 
                        ? 'bg-crypto-accent border-blue-400' 
                        : 'bg-gray-800/50 border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {alert.type === 'above' ? (
                          <ArrowUp className="h-5 w-5 text-green-400" />
                        ) : (
                          <ArrowDown className="h-5 w-5 text-red-400" />
                        )}
                        <span className="font-medium">{alert.tokenSymbol}</span>
                      </div>
                      
                      <div className="text-sm">
                        <span className="text-gray-400">Alert when price goes </span>
                        <span className={alert.type === 'above' ? 'text-green-400' : 'text-red-400'}>
                          {alert.type}
                        </span>
                        <span className="text-gray-400"> $</span>
                        <span className="font-medium">{alert.threshold.toLocaleString()}</span>
                      </div>

                      <div className="flex items-center space-x-1">
                        {getNotificationIcon(alert.notificationType)}
                        <span className="text-sm text-gray-400 capitalize">
                          {alert.notificationType}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {isTriggered && (
                        <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                          Triggered
                        </span>
                      )}
                      
                      <button
                        onClick={() => toggleAlert(alert.id, alert.isActive)}
                        className={`px-3 py-1 rounded text-xs font-medium ${
                          alert.isActive 
                            ? 'bg-green-600 text-white' 
                            : 'bg-gray-600 text-gray-300'
                        }`}
                      >
                        {alert.isActive ? 'Active' : 'Inactive'}
                      </button>
                      
                      <button
                        onClick={() => deleteAlert(alert.id)}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {token && (
                    <div className="mt-2 text-sm text-gray-400">
                      Current price: ${token.currentPrice.toLocaleString()}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Create Alert Modal */}
      {showCreateAlert && (
        <CreateAlertModal onClose={() => setShowCreateAlert(false)} />
      )}
    </div>
  )
}

export default Alerts