import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const PriceChart = ({ tokens }) => {
  // Generate sample historical data for demo
  const generateChartData = () => {
    const data = []
    const now = new Date()
    
    for (let i = 23; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1000)
      const dataPoint = {
        time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        timestamp: time.getTime()
      }
      
      tokens.forEach(token => {
        // Generate realistic price movements
        const basePrice = token.currentPrice
        const volatility = 0.05 // 5% volatility
        const randomChange = (Math.random() - 0.5) * volatility
        dataPoint[token.symbol] = basePrice * (1 + randomChange)
      })
      
      data.push(dataPoint)
    }
    
    return data
  }

  const chartData = generateChartData()
  const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6']

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="time" 
            stroke="#9CA3AF"
            tick={{ fill: '#9CA3AF' }}
          />
          <YAxis 
            stroke="#9CA3AF"
            tick={{ fill: '#9CA3AF' }}
            tickFormatter={(value) => `$${value.toFixed(0)}`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1F2937', 
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#F9FAFB'
            }}
            labelFormatter={(label) => `Time: ${label}`}
            formatter={(value, name) => [`$${value.toFixed(2)}`, name]}
          />
          {tokens.map((token, index) => (
            <Line
              key={token.symbol}
              type="monotone"
              dataKey={token.symbol}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: colors[index % colors.length] }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PriceChart