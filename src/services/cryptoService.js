// Simulated crypto data service
// In production, this would connect to CoinGecko API

const DEMO_CRYPTO_DATA = {
  'BTC': {
    name: 'Bitcoin',
    symbol: 'BTC',
    current_price: 43500,
    price_change_percentage_24h: 2.5,
    market_cap: 850000000000,
    total_volume: 15000000000
  },
  'ETH': {
    name: 'Ethereum',
    symbol: 'ETH',
    current_price: 2600,
    price_change_percentage_24h: -1.2,
    market_cap: 310000000000,
    total_volume: 8000000000
  },
  'SOL': {
    name: 'Solana',
    symbol: 'SOL',
    current_price: 95,
    price_change_percentage_24h: 8.9,
    market_cap: 40000000000,
    total_volume: 2000000000
  }
}

export const getCryptoData = async (symbols) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  return symbols.map(symbol => DEMO_CRYPTO_DATA[symbol.toUpperCase()])
}

export const searchCryptos = async (query) => {
  // Simulate search functionality
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const allCryptos = Object.values(DEMO_CRYPTO_DATA)
  return allCryptos.filter(crypto => 
    crypto.name.toLowerCase().includes(query.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(query.toLowerCase())
  )
}

export const subscribeToPriceUpdates = (callback) => {
  // Simulate real-time price updates
  const interval = setInterval(() => {
    const updates = {}
    Object.keys(DEMO_CRYPTO_DATA).forEach(symbol => {
      const current = DEMO_CRYPTO_DATA[symbol]
      const priceChange = (Math.random() - 0.5) * 0.02
      updates[symbol] = {
        ...current,
        current_price: current.current_price * (1 + priceChange),
        price_change_percentage_24h: current.price_change_percentage_24h + (Math.random() - 0.5) * 2
      }
    })
    callback(updates)
  }, 5000)
  
  return () => clearInterval(interval)
}