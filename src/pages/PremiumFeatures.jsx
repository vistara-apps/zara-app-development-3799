import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { usePaymentContext } from '../services/paymentService'
import { Crown, Check, Zap, Shield, BarChart3, Bell, MessageSquare } from 'lucide-react'

const PremiumFeatures = () => {
  const { user, upgradeToPremium } = useAuth()
  const { createSession } = usePaymentContext()
  const [loading, setLoading] = useState(false)
  const [paid, setPaid] = useState(user.isPremium)

  const handleUpgrade = async () => {
    try {
      setLoading(true)
      await createSession()
      setPaid(true)
      upgradeToPremium()
    } catch (error) {
      console.error('Payment failed:', error)
      alert('Payment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const features = [
    {
      icon: <Bell className="h-5 w-5" />,
      title: "Advanced Alerts",
      description: "Set unlimited price alerts with custom conditions and multiple notification channels",
      free: "5 alerts max",
      premium: "Unlimited alerts"
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: "Portfolio Analytics",
      description: "Deep insights into your trading patterns, risk assessment, and performance metrics",
      free: "Basic stats",
      premium: "Advanced analytics"
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: "Telegram Integration",
      description: "Real-time notifications and portfolio updates via Telegram bot",
      free: "Email only",
      premium: "Telegram + Email"
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Real-time Data",
      description: "Live price feeds and instant market updates with minimal delay",
      free: "5min delay",
      premium: "Real-time"
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Portfolio Backup",
      description: "Secure cloud backup and synchronization across all your devices",
      free: "Local only",
      premium: "Cloud backup"
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: "Custom Dashboards",
      description: "Create personalized dashboards with advanced charts and widgets",
      free: "Standard view",
      premium: "Custom layouts"
    }
  ]

  if (paid) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Crown className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome to Premium!</h1>
          <p className="text-gray-400">You now have access to all premium features</p>
        </div>

        <div className="card text-center">
          <h2 className="text-xl font-bold mb-4">Premium Features Unlocked</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3 text-left">
                <div className="text-green-400 mt-1">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-medium">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                  <p className="text-sm text-green-400 font-medium mt-1">
                    ✓ {feature.premium}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Crown className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Upgrade to Premium</h1>
        <p className="text-gray-400">Unlock advanced features and take your crypto tracking to the next level</p>
      </div>

      {/* Pricing */}
      <div className="max-w-md mx-auto">
        <div className="card border-2 border-yellow-400">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Premium Plan</h2>
            <div className="text-4xl font-bold text-yellow-400 mb-2">$9.99</div>
            <p className="text-gray-400">per month</p>
          </div>
          
          <button
            onClick={handleUpgrade}
            disabled={loading}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold py-3 px-6 rounded-lg hover:from-yellow-300 hover:to-yellow-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing Payment...' : 'Upgrade Now'}
          </button>
          
          <p className="text-xs text-gray-400 text-center mt-4">
            Cancel anytime. No hidden fees.
          </p>
        </div>
      </div>

      {/* Features Comparison */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-6 text-center">Feature Comparison</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="pb-3">Feature</th>
                <th className="pb-3 text-center">Free</th>
                <th className="pb-3 text-center">Premium</th>
              </tr>
            </thead>
            <tbody className="space-y-4">
              {features.map((feature, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="py-4">
                    <div className="flex items-start space-x-3">
                      <div className="text-blue-400 mt-1">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-medium">{feature.title}</h3>
                        <p className="text-sm text-gray-400">{feature.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-center">
                    <span className="text-gray-400">{feature.free}</span>
                  </td>
                  <td className="py-4 text-center">
                    <span className="text-green-400 font-medium">{feature.premium}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Benefits */}
      <div className="card">
        <h2 className="text-xl font-bold mb-6">Why Upgrade to Premium?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Check className="h-5 w-5 text-green-400 mt-1" />
              <div>
                <h3 className="font-medium">Never Miss Opportunities</h3>
                <p className="text-sm text-gray-400">Real-time alerts ensure you catch every important price movement</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Check className="h-5 w-5 text-green-400 mt-1" />
              <div>
                <h3 className="font-medium">Optimize Your Strategy</h3>
                <p className="text-sm text-gray-400">Advanced analytics help you make better trading decisions</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Check className="h-5 w-5 text-green-400 mt-1" />
              <div>
                <h3 className="font-medium">Stay Connected</h3>
                <p className="text-sm text-gray-400">Telegram integration keeps you updated on the go</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Check className="h-5 w-5 text-green-400 mt-1" />
              <div>
                <h3 className="font-medium">Peace of Mind</h3>
                <p className="text-sm text-gray-400">Secure cloud backup protects your portfolio data</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PremiumFeatures