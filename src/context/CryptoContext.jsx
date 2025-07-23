import React, { createContext, useContext, useState, useEffect } from 'react'
import { getCryptoData, subscribeToPriceUpdates } from '../services/cryptoService'

const CryptoContext = createContext()

export const useCrypto = () => {
  const context = useContext(CryptoContext)
  if (!context) {
    throw new Error('useCrypto must be used within a CryptoProvider')
  }
  return context
}

export const CryptoProvider = ({ children }) => {
  const [trackedTokens, setTrackedTokens] = useState([
    {
      id: 1,
      symbol: 'BTC',
      name: 'Bitcoin',
      currentPrice: 43500,
      change24h: 2.5,
      holdings: 0.5,
      priceHistory: []
    },
    {
      id: 2,
      symbol: 'ETH',
      name: 'Ethereum',
      currentPrice: 2600,
      change24h: -1.2,
      holdings: 5.2,
      priceHistory: []
    },
    {
      id: 3,
      symbol: 'SOL',
      name: 'Solana',
      currentPrice: 95,
      change24h: 8.9,
      holdings: 25,
      priceHistory: []
    }
  ])

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      tokenSymbol: 'BTC',
      threshold: 45000,
      type: 'above',
      notificationType: 'telegram',
      isActive: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      tokenSymbol: 'ETH',
      threshold: 2500,
      type: 'below',
      notificationType: 'email',
      isActive: true,
      createdAt: new Date().toISOString()
    }
  ])

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Simulate real-time price updates
    const updatePrices = () => {
      setTrackedTokens(prev => 
        prev.map(token => ({
          ...token,
          currentPrice: token.currentPrice * (1 + (Math.random() - 0.5) * 0.02),
          change24h: token.change24h + (Math.random() - 0.5) * 2
        }))
      )
    }

    const interval = setInterval(updatePrices, 5000)
    return () => clearInterval(interval)
  }, [])

  const addToken = (tokenData) => {
    const newToken = {
      id: Date.now(),
      ...tokenData,
      priceHistory: []
    }
    setTrackedTokens(prev => [...prev, newToken])
  }

  const removeToken = (tokenId) => {
    setTrackedTokens(prev => prev.filter(token => token.id !== tokenId))
  }

  const addAlert = (alertData) => {
    const newAlert = {
      id: Date.now(),
      ...alertData,
      isActive: true,
      createdAt: new Date().toISOString()
    }
    setAlerts(prev => [...prev, newAlert])
  }

  const updateAlert = (alertId, updates) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId ? { ...alert, ...updates } : alert
      )
    )
  }

  const deleteAlert = (alertId) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId))
  }

  const value = {
    trackedTokens,
    alerts,
    loading,
    addToken,
    removeToken,
    addAlert,
    updateAlert,
    deleteAlert
  }

  return (
    <CryptoContext.Provider value={value}>
      {children}
    </CryptoContext.Provider>
  )
}