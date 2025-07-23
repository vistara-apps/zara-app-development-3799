import React, { useState } from 'react'
import { useCrypto } from '../context/CryptoContext'
import { useAuth } from '../context/AuthContext'
import { X, ArrowUp, ArrowDown } from 'lucide-react'

const CreateAlertModal = ({ onClose }) => {
  const { addAlert, trackedTokens } = useCrypto()
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    tokenSymbol: '',
    threshold: '',
    type: 'above',
    notificationType: 'email'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Check if user has reached free tier limit
    const freeAlertLimit = 5
    const currentAlertsCount = 3 // This would come from context in real app
    
    if (!user.isPremium && currentAlertsCount >= freeAlertLimit) {
      alert('You have reached the free tier limit of 5 alerts. Upgrade to Premium for unlimited alerts.')
      return
    }

    if (!formData.tokenSymbol || !formData.threshold) {
      alert('Please fill in all fields')
      return
    }

    addAlert({
      tokenSymbol: formData.tokenSymbol,
      threshold: parseFloat(formData.threshold),
      type: formData.type,
      notificationType: formData.notificationType
    })
    
    onClose()
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const selectedToken = trackedTokens.find(token => token.symbol === formData.tokenSymbol)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-crypto-secondary rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Create Price Alert</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Token Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Select Token</label>
            <select
              value={formData.tokenSymbol}
              onChange={(e) => handleChange('tokenSymbol', e.target.value)}
              className="input w-full"
              required
            >
              <option value="">Choose a token</option>
              {trackedTokens.map(token => (
                <option key={token.id} value={token.symbol}>
                  {token.name} ({token.symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Current Price Display */}
          {selectedToken && (
            <div className="p-3 bg-crypto-accent rounded-lg">
              <p className="text-sm text-gray-400">Current Price</p>
              <p className="text-lg font-bold">${selectedToken.currentPrice.toLocaleString()}</p>
            </div>
          )}

          {/* Alert Type */}
          <div>
            <label className="block text-sm font-medium mb-2">Alert When Price Goes</label>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => handleChange('type', 'above')}
                className={`flex-1 flex items-center justify-center space-x-2 p-3 rounded-lg border transition-colors ${
                  formData.type === 'above'
                    ? 'border-green-400 bg-green-400/10 text-green-400'
                    : 'border-gray-600 hover:border-gray-500'
                }`}
              >
                <ArrowUp className="h-4 w-4" />
                <span>Above</span>
              </button>
              <button
                type="button"
                onClick={() => handleChange('type', 'below')}
                className={`flex-1 flex items-center justify-center space-x-2 p-3 rounded-lg border transition-colors ${
                  formData.type === 'below'
                    ? 'border-red-400 bg-red-400/10 text-red-400'
                    : 'border-gray-600 hover:border-gray-500'
                }`}
              >
                <ArrowDown className="h-4 w-4" />
                <span>Below</span>
              </button>
            </div>
          </div>

          {/* Threshold Price */}
          <div>
            <label className="block text-sm font-medium mb-2">Target Price ($)</label>
            <input
              type="number"
              value={formData.threshold}
              onChange={(e) => handleChange('threshold', e.target.value)}
              placeholder="0.00"
              className="input w-full"
              step="0.01"
              min="0"
              required
            />
          </div>

          {/* Notification Type */}
          <div>
            <label className="block text-sm font-medium mb-2">Notification Method</label>
            <select
              value={formData.notificationType}
              onChange={(e) => handleChange('notificationType', e.target.value)}
              className="input w-full"
            >
              <option value="email">Email</option>
              <option value="telegram" disabled={!user.isPremium}>
                Telegram {!user.isPremium && '(Premium)'}
              </option>
            </select>
            {!user.isPremium && (
              <p className="text-xs text-gray-400 mt-1">
                Telegram notifications available with Premium subscription
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 btn-primary"
            >
              Create Alert
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateAlertModal