// Chat simulation service for demo purposes
// This simulates real-time chat functionality without requiring a backend

export class ChatSimulation {
  constructor() {
    this.isActive = false
    this.messageQueue = []
    this.typingQueue = []
    this.intervals = []
  }

  // Demo messages for different rooms
  static DEMO_MESSAGES = {
    general: [
      'Bitcoin is showing strong support at $42k 💪',
      'Anyone else watching the ETH/BTC ratio?',
      'This market volatility is insane today!',
      'Just set up some DCA orders for the weekend',
      'The fear and greed index is at 25 - time to buy? 🤔',
      'Altcoin season might be starting soon',
      'Remember to take profits on the way up! 📈',
      'HODL strong, diamond hands! 💎🙌',
      'What do you think about the new regulations?',
      'Technical analysis is looking bullish for Q4'
    ],
    trading: [
      'Long BTC at $42,150 with tight stop loss',
      'ETH breaking out of the triangle pattern 📊',
      'Volume is picking up on major altcoins',
      'RSI showing oversold conditions on the 4H',
      'Support level holding strong at $41,800',
      'Resistance at $43,500 needs to be broken',
      'Setting alerts for key Fibonacci levels',
      'Options flow showing bullish sentiment',
      'Whale movements detected on-chain 🐋',
      'Perfect entry point for swing trades'
    ],
    alerts: [
      '🚨 BTC Alert: Price crossed $42,500',
      '📊 ETH Alert: Volume spike detected',
      '⚠️ DOGE Alert: 15% price increase in 1H',
      '🔔 Portfolio Alert: Daily gain target reached',
      '📈 SOL Alert: Breaking resistance at $95',
      '⏰ Reminder: DCA order executed',
      '🎯 Target Alert: Take profit level hit',
      '📉 Stop Loss Alert: Position closed',
      '🔥 Trending Alert: AVAX gaining momentum',
      '💡 Opportunity Alert: Arbitrage detected'
    ],
    premium: [
      'Exclusive alpha: New DeFi protocol launching next week',
      'Institutional flow data shows accumulation',
      'Private sale opportunity in promising L2 project',
      'Whale wallet analysis reveals interesting patterns',
      'Advanced TA: Hidden divergence on multiple timeframes',
      'Insider info: Major exchange listing coming',
      'Premium signal: Long-term accumulation zone',
      'VIP access: Early beta testing for new DEX',
      'Exclusive research: Tokenomics deep dive',
      'Premium community: AMA with project founder'
    ]
  }

  // Demo users with different personalities
  static DEMO_USERS = [
    { 
      id: 2, 
      name: 'Alice Chen', 
      avatar: '👩‍💼', 
      status: 'online',
      personality: 'analytical',
      favoriteRooms: ['trading', 'general']
    },
    { 
      id: 3, 
      name: 'Bob Martinez', 
      avatar: '👨‍💻', 
      status: 'online',
      personality: 'enthusiastic',
      favoriteRooms: ['general', 'alerts']
    },
    { 
      id: 4, 
      name: 'Carol Johnson', 
      avatar: '👩‍🔬', 
      status: 'away',
      personality: 'technical',
      favoriteRooms: ['trading', 'premium']
    },
    { 
      id: 5, 
      name: 'David Kim', 
      avatar: '👨‍🎨', 
      status: 'online',
      personality: 'casual',
      favoriteRooms: ['general']
    },
    { 
      id: 6, 
      name: 'Emma Wilson', 
      avatar: '👩‍🚀', 
      status: 'online',
      personality: 'expert',
      favoriteRooms: ['premium', 'trading']
    }
  ]

  start(onMessage, onTyping) {
    if (this.isActive) return

    this.isActive = true
    this.onMessage = onMessage
    this.onTyping = onTyping

    // Start message simulation
    this.startMessageSimulation()
    
    // Start typing simulation
    this.startTypingSimulation()

    console.log('Chat simulation started')
  }

  stop() {
    this.isActive = false
    this.intervals.forEach(interval => clearInterval(interval))
    this.intervals = []
    console.log('Chat simulation stopped')
  }

  startMessageSimulation() {
    // Random message generation
    const messageInterval = setInterval(() => {
      if (!this.isActive) return

      // 20% chance of generating a message every 5-15 seconds
      if (Math.random() < 0.2) {
        this.generateRandomMessage()
      }
    }, 5000 + Math.random() * 10000)

    this.intervals.push(messageInterval)
  }

  startTypingSimulation() {
    // Random typing indicators
    const typingInterval = setInterval(() => {
      if (!this.isActive) return

      // 30% chance of showing typing indicator
      if (Math.random() < 0.3) {
        this.generateTypingIndicator()
      }
    }, 3000 + Math.random() * 7000)

    this.intervals.push(typingInterval)
  }

  generateRandomMessage() {
    const rooms = ['general', 'trading', 'alerts', 'premium']
    const randomRoom = rooms[Math.floor(Math.random() * rooms.length)]
    
    // Filter users who like this room
    const relevantUsers = ChatSimulation.DEMO_USERS.filter(user => 
      user.favoriteRooms.includes(randomRoom) && user.status === 'online'
    )
    
    if (relevantUsers.length === 0) return

    const randomUser = relevantUsers[Math.floor(Math.random() * relevantUsers.length)]
    const messages = ChatSimulation.DEMO_MESSAGES[randomRoom]
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]

    const message = {
      id: Date.now() + Math.random(),
      userId: randomUser.id,
      user: randomUser,
      content: randomMessage,
      timestamp: new Date(),
      roomId: randomRoom,
      type: 'text',
      status: 'delivered'
    }

    if (this.onMessage) {
      this.onMessage(message)
    }
  }

  generateTypingIndicator() {
    const onlineUsers = ChatSimulation.DEMO_USERS.filter(user => user.status === 'online')
    if (onlineUsers.length === 0) return

    const randomUser = onlineUsers[Math.floor(Math.random() * onlineUsers.length)]
    
    if (this.onTyping) {
      // Start typing
      this.onTyping(randomUser, true)
      
      // Stop typing after 2-5 seconds
      setTimeout(() => {
        if (this.onTyping) {
          this.onTyping(randomUser, false)
        }
      }, 2000 + Math.random() * 3000)
    }
  }

  // Simulate user joining/leaving
  simulateUserActivity() {
    // This could be expanded to simulate users going online/offline
    // For now, we keep it simple with the static user list
  }

  // Generate contextual responses
  generateResponse(userMessage, roomId) {
    // This could be expanded to generate more intelligent responses
    // based on the user's message content and room context
    
    const responses = {
      general: [
        'Interesting point! 🤔',
        'I agree with that analysis',
        'Thanks for sharing!',
        'What do you think about the long-term outlook?',
        'Good observation 👍'
      ],
      trading: [
        'Nice setup! What\'s your target?',
        'I\'m seeing similar patterns',
        'Risk management is key here',
        'Volume confirms the breakout',
        'Solid technical analysis 📊'
      ],
      alerts: [
        'Thanks for the heads up!',
        'Setting up my alerts now',
        'Perfect timing on that notification',
        'Appreciate the update 🔔',
        'Good catch!'
      ],
      premium: [
        'Exclusive insights as always',
        'This alpha is gold 🏆',
        'Premium content at its finest',
        'Thanks for the insider perspective',
        'VIP information is invaluable'
      ]
    }

    const roomResponses = responses[roomId] || responses.general
    return roomResponses[Math.floor(Math.random() * roomResponses.length)]
  }
}

// Singleton instance
export const chatSimulation = new ChatSimulation()

