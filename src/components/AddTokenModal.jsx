import React, { useState } from 'react'
import { useCrypto } from '../context/CryptoContext'
import { X, Search } from 'lucide-react'
import { searchCryptos } from '../services/cryptoService'

const AddTokenModal = ({ onClose }) => {
  const { addToken } = useCrypto()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [holdings, setHoldings] = useState('')

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    
    setLoading(true)
    try {
      const results = await searchCryptos(searchQuery)
      setSearchResults(results)
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToken = (crypto) => {
    addToken({
      symbol: crypto.symbol,
      name: crypto.name,
      currentPrice: crypto.current_price,
      change24h: crypto.price_change_percentage_24h,
      holdings: parseFloat(holdings) || 0
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-crypto-secondary rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Add Token to Portfolio</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium mb-2">Search Token</label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Bitcoin, ETH, BTC..."
                className="input flex-1"
              />
              <button onClick={handleSearch} className="btn-primary">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Holdings */}
          <div>
            <label className="block text-sm font-medium mb-2">Holdings (optional)</label>
            <input
              type="number"
              value={holdings}
              onChange={(e) => setHoldings(e.target.value)}
              placeholder="0.00"
              className="input w-full"
              step="0.01"
              min="0"
            />
          </div>

          {/* Search Results */}
          {loading && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
            </div>
          )}

          {searchResults.length > 0 && (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              <label className="block text-sm font-medium">Select Token</label>
              {searchResults.map((crypto) => (
                <button
                  key={crypto.symbol}
                  onClick={() => handleAddToken(crypto)}
                  className="w-full flex items-center justify-between p-3 bg-crypto-accent hover:bg-crypto-primary rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold">{crypto.symbol.slice(0, 2)}</span>
                    </div>
                    <div className="text-left">
                      <p className="font-medium">{crypto.name}</p>
                      <p className="text-sm text-gray-400">{crypto.symbol.toUpperCase()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${crypto.current_price.toLocaleString()}</p>
                    <p className={`text-sm ${crypto.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {crypto.price_change_percentage_24h > 0 ? '+' : ''}{crypto.price_change_percentage_24h.toFixed(2)}%
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {searchQuery && !loading && searchResults.length === 0 && (
            <p className="text-gray-400 text-center py-4">No tokens found. Try a different search.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default AddTokenModal